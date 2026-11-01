/* Wheel physics and bookmark timing use separate bounds. */
(() => {
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  window.TelarScrollMotion=class {
    static bookmarkSeconds(distance,viewport){return clamp(Math.abs(distance)/Math.max(1,viewport)*1.33,1.2,3)}
    constructor(position=0){this.reset(position)}
    reset(position){this.position=this.target=position;this.velocity=0;this.active=false;this.direction=0;this.transition=null}
    moveTo(target,viewport){
      // Telar's moveSeconds bounds, using viewport travel for this homepage.
      this.transition={from:this.position,elapsed:0,duration:this.constructor.bookmarkSeconds(target-this.position,viewport)};
      this.target=target;this.velocity=0;this.active=true;
    }
    wheel(delta,viewport,limit){
      if(this.transition)this.reset(this.position);
      const direction=Math.sign(delta);
      if(direction!==this.direction)this.target=this.position;
      this.direction=direction;
      this.target=clamp(this.target+delta,this.position-viewport*1.2,this.position+viewport*1.2);
      this.target=clamp(this.target,0,limit);this.active=true;
    }
    step(seconds,viewport,limit){
      if(!this.active)return this.position;
      this.target=clamp(this.target,0,limit);
      if(this.transition){
        const move=this.transition,previous=this.position;move.elapsed+=Math.max(0,seconds);
        const p=clamp(move.elapsed/move.duration,0,1),eased=1-Math.pow(1-p,3);
        this.position=clamp(move.from+(this.target-move.from)*eased,0,limit);
        this.velocity=seconds>0?(this.position-previous)/seconds:0;
        if(p>=1){this.position=this.target;this.velocity=0;this.active=false;this.transition=null}
        return this.position;
      }
      // Bound actual wheel travel and acceleration independently of arrow timing.
      const acceleration=viewport*2.5,maxSpeed=viewport;
      const dt=clamp(seconds,0,.05),distance=this.target-this.position;
      const desired=Math.sign(distance)*Math.min(maxSpeed,Math.sqrt(2*acceleration*Math.abs(distance)),Math.abs(distance)*5.5);
      this.velocity+=clamp(desired-this.velocity,-acceleration*dt,acceleration*dt);
      this.position=clamp(this.position+this.velocity*dt,0,limit);
      if(Math.abs(this.target-this.position)<.15&&Math.abs(this.velocity)<2){this.position=this.target;this.velocity=0;this.active=false}
      return this.position;
    }
  };
})();
