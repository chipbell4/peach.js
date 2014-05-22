describe('Peach.Geometry.Point', function() {

	// Helper fuzzy compare function
	var expectToBeRouglyEqual = function(value, expected) {
		expect( Math.abs( value - expected ) < 0.00001 ).to.be.ok;
	}

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

		// Use fuzzy comparison for values, due to roundoff
		expectToBeRouglyEqual(p.x, 0);
		expectToBeRouglyEqual(p.y, 2);
	});

	it('Should provide a method for the dot product', function() {
		var p1 = Peach.Geometry.Point.fromCartesian(1, 2);
		var p2 = Peach.Geometry.Point.fromCartesian(3, 4);

		expectToBeRouglyEqual(p1.dot(p2), 11);
		expectToBeRouglyEqual(p2.dot(p1), 11);
	});

	it('Should provide a magnitude method', function() {
		var p = Peach.Geometry.Point.fromCartesian(3, 4);

		expectToBeRouglyEqual(p.magnitude(), 5);
	});
});
