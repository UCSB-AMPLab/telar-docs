from collections import Counter,defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote,urlsplit
import html,json,re,sys
ROOT=Path(__file__).resolve().parents[1];PUBLIC=ROOT/'public'
VOID={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
def norm(s):return re.sub(r'\s+',' ',html.unescape(s)).strip().replace('’',"'").replace('“','"').replace('”','"').replace('…','...')
class Page(HTMLParser):
 def __init__(self,path):
  super().__init__(convert_charrefs=True)
  self.ids=Counter();self.links=[];self.images=[];self.lang=None;self.canon=[];self.alternates={};self.titles=0;self.descriptions=0;self.robots=[];self.stack=[];self.article=None;self.active=[];self.selectors=defaultdict(list);self.runtime_urls=[]
  self.feed(path.read_text())
 def handle_starttag(self,tag,attrs):
  a=dict(attrs);depth=len(self.stack)
  if a.get('id'):self.ids[a['id']]+=1
  for key in ('href','src'):
   if a.get(key):self.links.append(a[key])
  if tag=='html':self.lang=a.get('lang')
  if tag=='title':self.titles+=1
  if tag=='meta':
   if a.get('name')=='description':self.descriptions+=1
   if a.get('name')=='robots':self.robots.append(a.get('content',''))
  if tag=='link':
   if a.get('rel')=='canonical':self.canon.append(a.get('href'))
   if a.get('rel')=='alternate' and a.get('hreflang'):self.alternates[a['hreflang']]=a['href']
  if tag=='img':self.images.append(a)
  if tag in ('script','iframe','img','link') and a.get('src',a.get('href')):self.runtime_urls.append(a.get('src',a.get('href')))
  if tag=='form' and a.get('action'):self.runtime_urls.append(a['action'])
  if 'docs-content' in a.get('class','').split():self.article=depth
  if self.article is not None:
   if tag=='img':self.selectors[tag].append([a.get('src'),a.get('alt')])
   if tag in ('h1','h2','h3','h4','h5','h6','pre','table','blockquote'):self.active.append({'tag':tag,'depth':depth,'text':[]})
  if tag not in VOID:self.stack.append(tag)
 def handle_endtag(self,tag):
  if tag not in self.stack:return
  depth=len(self.stack)-1-self.stack[::-1].index(tag)
  for cap in list(self.active):
   if cap['depth']>=depth:self.selectors[cap['tag']].append(norm(''.join(cap['text'])));self.active.remove(cap)
  if self.article is not None and self.article>=depth:self.article=None
  self.stack=self.stack[:depth]
 def handle_data(self,data):
  for cap in self.active:cap['text'].append(data)
inventory=json.loads((ROOT/'migration/inventory.json').read_text())['pages']
contracts=json.loads((ROOT/'migration/content-contracts.json').read_text())
preview=json.loads((ROOT/'.build-result.json').read_text())['preview'];base='http://127.0.0.1:4004' if preview else 'https://telar.org'
pages={};errors=[];checks=0
def check(ok,msg):
 global checks
 checks+=1
 if not ok:errors.append(msg)
def route_file(route):return PUBLIC/route.strip('/')/'index.html'
for file in PUBLIC.rglob('*.html'):
 if 'pagefind' not in file.parts:pages[file.resolve()]=Page(file)
pairs=defaultdict(list)
for row in inventory:pairs[row['translationKey']].append(row)
for row in inventory:
 route=row['url'];p=pages.get(route_file(route).resolve());check(p is not None,'Missing route '+route)
 if p is None:continue
 check(p.lang==row['lang'],'Wrong language '+route);check(all(n==1 for n in p.ids.values()),'Duplicate IDs '+route)
 if row['type']=='redirect':continue
 check(p.titles==1 and p.descriptions==1,'Duplicate/missing metadata '+route);check(p.canon==[base+route],'Wrong canonical '+route)
 for other in pairs[row['translationKey']]:check(p.alternates.get(other['lang'])==base+other['url'],'Wrong hreflang '+route)
 if route in contracts:
  contract=contracts[route];check(set(contract['ids']).issubset(p.ids),'Lost anchors '+route)
  for selector,expected in contract['selectors'].items():check(p.selectors[selector]==expected,'Changed '+selector+' content '+route)
 if preview:check(any('noindex' in v for v in p.robots),'Preview is indexable '+route)
legacy=json.loads((ROOT/'migration/legacy-routes.json').read_text())
for row in legacy:check(route_file(row['url']).exists(),'Lost legacy route '+row['url'])
for file,p in pages.items():
 for img in p.images:check('alt' in img,'Missing image alt '+str(file))
 for href in p.links:
  u=urlsplit(href);check(not re.search(r'127\.0\.0\.1:(4002|4003)',href),'Prototype dependency '+href)
  if u.scheme or u.netloc:continue
  target=file if not u.path else (PUBLIC/unquote(u.path.lstrip('/')) if u.path.startswith('/') else file.parent/unquote(u.path))
  if target.is_dir() or u.path.endswith('/'):target=target/'index.html'
  check(target.exists(),'Broken link '+str(file.relative_to(PUBLIC))+' -> '+href)
  if u.fragment and target.suffix=='.html' and target.exists():
   other=pages.get(target.resolve());check(other and unquote(u.fragment) in other.ids,'Broken fragment '+href)
 if not preview:check(all('127.0.0.1' not in u for u in p.runtime_urls),'Local runtime URL in production '+str(file.relative_to(PUBLIC)))
for lang,route in [('en','/'),('es','/es/')]:
 p=pages.get(route_file(route).resolve());check(p and p.lang==lang,'Missing home '+lang);check(p and p.canon==[base+route],'Wrong home canonical '+lang)
check((PUBLIC/'pagefind/pagefind.js').exists(),'Search index missing');check((PUBLIC/'sitemap.xml').exists(),'Sitemap missing')
check(('Disallow: /' in (PUBLIC/'robots.txt').read_text())==preview,'Wrong robots policy')
out={'checks':checks,'failures':len(errors),'preview':preview,'routes':len(inventory),'errors':errors}
(ROOT/'reports').mkdir(exist_ok=True);(ROOT/'reports/verification.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps({k:v for k,v in out.items() if k!='errors'}))
for error in errors[:30]:print(error,file=sys.stderr)
sys.exit(bool(errors))
