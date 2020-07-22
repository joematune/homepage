let tl = gsap.timeline({ repeat: -1, defaults: { duration: 0.1, ease: 'none' } });
tl.to('.flame', { morphSVG: '.yellow02'})
  .to('.flame', { morphSVG: '.green03' })
  .to('.flame', { morphSVG: '.blue04'  })
  .to('.flame', { morphSVG: '.lime05'  })
  .to('.flame', { morphSVG: '.aqua06'  })
  .to('.flame', { morphSVG: '.purple07'})
  .to('.flame', { morphSVG: '.pink08'  })
  .to('.flame', { morphSVG: '.flame'   });
