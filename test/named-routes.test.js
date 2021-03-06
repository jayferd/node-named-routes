var Route = require('./../lib/named-routes')

module.exports = {
  "it's a function": function(assert) {
    assert.ok(typeof Route === 'function');
  },
  "basic route": function(assert) {
    var route = new Route('/foo');
    assert.equal('/foo', route.template)
    assert.equal('/foo', route.path())
  },
  "route with variables": function(assert) {
    var route = new Route('/foo/:bar/baz/:zot')
    assert.equal('/foo/zwibble/baz/42', route.path('zwibble', 42))
  },
  "route with a url": function(assert) {
    Route.home = 'http://www.example.com/'
    var route = new Route('foo/:bar')
    assert.equal('http://www.example.com/foo/3', route.url(3))
  },
  "route with variables, with object syntax": function(assert) {
    var route = new Route('/fizz/:buzz/:beez')
    assert.equal('/fizz/1/2', route.path({buzz:1,beez:2}))
    assert.equal('/fizz/3/4', route.path(3, {beez:4}))
    assert.equal('/fizz/5/6', route.path(6, {buzz:5}))
  },
  "route with splat": function(assert) {
    var route = new Route('/blah/*/blorg')
    assert.equal('/blah/blat/blorg', route.path('blat'))
    assert.equal('/blah/blat/blam/blorg', route.path('blat/blam'))
  },
  "route with extra params": function(assert) {
    var route = new Route('/foo/:bar')
    assert.equal('/foo/1?baz=zot', route.path(1, {baz:'zot'}))
    assert.equal(
      '/foo/zorb?bizzle=bozzle',
      route.path({bar:'zorb',bizzle:'bozzle'})
    )
  }
};

(function() {
  var routes = Route.draw('http://mysite.com/', {
    foo: '/foo/:id',
    bar: '/bar/:id',
    bar_baz: '/bar/:id/baz/:baz_id'
  })

  module.exports["Route.map()"] = function(assert) {
    assert.ok(routes.foo)
    assert.ok(routes.bar)
    assert.ok(routes.bar_baz)
  }

  module.exports["Route.map() creates routes"] = function(assert) {
    assert.equal('/foo/76', routes.foo.path(76))
    assert.equal('/bar/77', routes.bar.path({id:77}))
    assert.equal('/bar/77/baz/88', routes.bar_baz.path({id:77,baz_id:88}))
  }
})()
