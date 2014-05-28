describe('Peach.Geometry.Rectangle', function() {

	var expectPointEquals = function(p1, p2) {
		expect(Math.abs(p1.x - p2.x) < 0.01).to.be.ok;
		expect(Math.abs(p1.y - p2.y) < 0.01).to.be.ok;
	};

	it('Should exist on the geometry object', function() {
		expect(Peach.Geometry.Rectangle).to.be.ok;
	});

	it('Should construct with the corners', function() {
		var corner1 = Peach.Geometry.Point.fromCartesian(1, 2);
		var corner2 = Peach.Geometry.Point.fromCartesian(3, 5);

		var rectangle = new Peach.Geometry.Rectangle(corner1, corner2);

		expectPointEquals(rectangle.top_left, corner1);
		expectPointEquals(rectangle.bottom_right, corner2);
		expect(rectangle.width).to.equal(2);
		expect(rectangle.height).to.equal(3);
	});
	
	it('Should construct with either order', function() {
		var corner1 = Peach.Geometry.Point.fromCartesian(1, 2);
		var corner2 = Peach.Geometry.Point.fromCartesian(3, 5);

		var rectangle = new Peach.Geometry.Rectangle(corner2, corner1);

		expectPointEquals(rectangle.top_left, corner1);
		expectPointEquals(rectangle.bottom_right, corner2);
		expect(rectangle.width).to.equal(2);
		expect(rectangle.height).to.equal(3);
	});

	describe('contains', function() {
		var corner1 = Peach.Geometry.Point.fromCartesian(1, 2);
		var corner2 = Peach.Geometry.Point.fromCartesian(3, 5);

		var rectangle = new Peach.Geometry.Rectangle(corner2, corner1);

		it('Should return true for points inside the rectangle', function() {
			var point = Peach.Geometry.Point.fromCartesian(2, 3);
			expect(rectangle.contains(point)).to.be.ok;
		});

		it('Should return false for points to the left of the rectangle', function() {
			var point = Peach.Geometry.Point.fromCartesian(0, 3);
			expect(rectangle.contains(point)).to.not.be.ok;
		});

		it('Should return false for points to the right of the rectangle', function() {
			var point = Peach.Geometry.Point.fromCartesian(10, 3);
			expect(rectangle.contains(point)).to.not.be.ok;
		});

		it('Should return false for points to the top of the rectangle', function() {
			var point = Peach.Geometry.Point.fromCartesian(2, 0);
			expect(rectangle.contains(point)).to.not.be.ok;
		});

		it('Should return false for points to the bottom of the rectangle', function() {
			var point = Peach.Geometry.Point.fromCartesian(2, 10);
			expect(rectangle.contains(point)).to.not.be.ok;
		});
	});
});
