# Keep rendered metadata aligned with the current guide navigation and page language.
# Page-specific descriptions are preserved; the shared definition is the fallback.
Jekyll::Hooks.register :site, :post_read do |site|
  site.pages.each do |page|
    next unless %w[docs section landing].include?(page.data["layout"])
    lang = page.data["lang"] == "es" ? "es" : "en"
    page.data["lang"] ||= lang
    navigation = page.site.data.fetch("docs_navigation", {})
    entry = navigation.fetch("pages", {})[page.url]
    page.data["title"] = entry["title"] if entry && entry["title"]
    fallback = page.site.data.fetch("site_copy", {}).fetch(lang, {})["description"]
    description = page.data["description"]
    if fallback && (description.nil? || description.empty? || description == page.site.config["description"])
      page.data["description"] = fallback
    end
  end
end
