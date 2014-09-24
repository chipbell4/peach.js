describe('Peach.Geometry.Rectangle', function() {

	var expectFloatEquals = function(f1, f2) {
		return expect(Math.abs(f1 - f2) < 0.01).to.be.ok;
	}

	var expectPointEquals = function(p1, p2) {
		expectFloatEquals(p1.x, p2.x);
		expectFloatEquals(p1.y, p2.y);
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

	describe('positioning helpers', function() {
		var corner1 = Peach.Geometry.Point.fromCartesian(1, 2);
		var corner2 = Peach.Geometry.Point.fromCartesian(3, 5);

		var rectangle = new Peach.Geometry.Rectangle(corner2, corner1);

		describe('toRightOf', function() {
			it('Should return true if the point is to the right of the rectangle', function() {
				var point = Peach.Geometry.Point.fromCartesian(0, 3);
				expect(rectangle.toRightOf(point)).to.be.ok;
			});
			
			it('Should return false if the point is not to the right of the rectangle', function() {
				var point = Peach.Geometry.Point.fromCartesian(2, 3);
				expect(rectangle.toRightOf(point)).to.not.be.ok;
			});
		});

		describe('toLeftOf', function() {
			it('Should return true if the point is to the right of the rectangle', function() {
				var point = Peach.Geometry.Point.fromCartesian(5, 3);
				expect(rectangle.toLeftOf(point)).to.be.ok;
			});
			
			it('Should return false if the rectangle is not to the left of the point', function() {
				var point = Peach.Geometry.Point.fromCartesian(2, 3);
				expect(rectangle.toLeftOf(point)).to.not.be.ok;
			});
		});

		describe('above', function() {
			it('Should return true for points below the rectangle', function() {
				var point = Peach.Geometry.Point.fromCartesian(2, 6);
				expect(rectangle.above(point)).to.be.ok;
			});
			
			it('Should return false for points not below the rectangle', function() {
				var point = Peach.Geometry.Point.fromCartesian(2, 3);
				expect(rectangle.above(point)).to.not.be.ok;
			});
		});

		describe('below', function() {
			it('Should return true for points above the rectangle', function() {
				var point = Peach.Geometry.Point.fromCartesian(2, 0);
				expect(rectangle.below(point)).to.be.ok;
			});
			
			it('Should return false for points not above the rectangle', function() {
				var point = Peach.Geometry.Point.fromCartesian(2, 3);
				expect(rectangle.below(point)).to.not.be.ok;
			});
		});

	});
	
	describe('translate', function() {
		it('Should shift the point correctly', function() {
			var rectangle = new Peach.Geometry.Rectangle(
				Peach.Geometry.Point.fromCartesian(0, 0),
				Peach.Geometry.Point.fromCartesian(1, 2)
			);

			var updated_rectangle = rectangle.translate(
				Peach.Geometry.Point.fromCartesian(2, 3)
			);

			expect(updated_rectangle).to.be.ok;
			expectPointEquals(updated_rectangle.top_left, Peach.Geometry.Point.fromCartesian(2, 3));
			expectPointEquals(updated_rectangle.bottom_right, Peach.Geometry.Point.fromCartesian(3, 5));
		});
	});

});
