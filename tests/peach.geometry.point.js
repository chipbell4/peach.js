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

	it('Should provide a method for scaling vectors', function() {
		var p = Peach.Geometry.Point.fromCartesian(3, 4);
		expectToBeRouglyEqual(p.magnitude(), 5);

		var p2 = p.scale(2);
		expectToBeRouglyEqual(p2.magnitude(), 10);
	});

	it('Should provide a method for rotating vectors', function() {
		var p = Peach.Geometry.Point.fromCartesian(1, 0);

		var p2 = p.rotate(Math.PI / 2);
		expectToBeRouglyEqual(p2.magnitude(), 1);
		expectToBeRouglyEqual(p2.x, 0);
		expectToBeRouglyEqual(p2.y, 1);
	});

	it('Should be able to create a rectangle from a point, width and height', function() {
		var p = Peach.Geometry.Point.fromCartesian(1, 2);

		var rectangle = p.expandToRectangle(10, 20);

		expect(rectangle).to.be.ok;
		expect(rectangle.width).to.equal(10);
		expect(rectangle.height).to.equal(20);
	});

	it('Should have the origin defined on it', function() {
		var origin = Peach.Geometry.Point.Origin;

		expect(origin).to.be.ok;
		expect(origin.x).to.equal(0);
		expect(origin.y).to.equal(0);
	});
});
