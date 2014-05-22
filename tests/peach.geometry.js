describe('Peach.Geometry', function() {
	describe('Point', function() {
		it('Should exist on the geometry object', function() {
			expect(Peach.Geometry.Point).to.be.ok;
		});

		it('Should provide a factory for cartesian points', function() {
			var p = Peach.Geometry.Point.fromCartesian(1, 2);

			expect(p.x).to.equal(1);
			expect(p.y).to.equal(2);
		});

		it('Should provide a factory for polar points', function() {
			var p = Peach.Geometry.Point.fromPolar(2, Math.PI / 2);

			expect(p.x).to.equal(0);
			expect(p.y).to.equal(2);
		})
	});
});
