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

	it('Should provide a method to negate a vector', function() {
		var p = Peach.Geometry.Point.fromCartesian(3, 4);

		var negative_p = p.negate();
	});

	it('Should provide a method to add vectors', function() {
		var p1 = Peach.Geometry.Point.fromCartesian(1, 2);
		var p2 = Peach.Geometry.Point.fromCartesian(3, 4);

		var p3 = p1.add(p2);
		var p4 = p2.add(p1);

		expect(p3.x).to.equal(4);
		expect(p3.y).to.equal(6);
		expect(p4.x).to.equal(4);
		expect(p4.y).to.equal(6);
	});
});
