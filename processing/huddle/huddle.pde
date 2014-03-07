// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A list of vehicles
ArrayList<Vehicle> vehicles;

void setup() {
  background(0, 0, 0);
  resize();
  
  // We are now making random vehicles and storing them in an ArrayList
  vehicles = new ArrayList<Vehicle>();
  for (int i = 0; i < 50; i++) {
    vehicles.add(new Vehicle(random(width),random(height)));
  }
}

void resize() {
  size(window.innerWidth, window.innerHeight);
}

void draw() {
  background(0, 0, 0);

  for (Vehicle v : vehicles) {
    // Path following and separation are worked on in this function
    v.applyBehaviors(vehicles);
    // Call the generic run method (update, borders, display, etc.)
    v.update();
    v.display();
  }

}

void mouseDragged() {
  vehicles.add(new Vehicle(mouseX,mouseY));
}


void mousePressed() {
  vehicles.add(new Vehicle(mouseX,mouseY));
}



// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Vehicle {

  // All the usual stuff
  PVector location;
  PVector velocity;
  PVector acceleration;
  float r;
  float maxforce;    // Maximum steering force
  float maxspeed;    // Maximum speed
  boolean hadCollision;

    // Constructor initialize all values
  Vehicle(float x, float y) {
    location = new PVector(x, y);
    r = 8;
    maxspeed = 3;
    maxforce = 0.1;
    acceleration = new PVector(0, 0);
    velocity = new PVector(0, 0);
    hadCollision = false;
  }

  void applyForce(PVector force) {
    // We could add mass here if we want A = F / M
    acceleration.add(force);
  }
  
  void applyBehaviors(ArrayList<Vehicle> vehicles) {
     PVector separateForce = separate(vehicles);
     PVector seekForce = seek(new PVector(mouseX,mouseY));
     separateForce.mult(2);
     seekForce.mult(0.01);
     applyForce(separateForce);
     applyForce(seekForce); 
  }
  
  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  PVector seek(PVector target) {
    PVector desired = PVector.sub(target,location);  // A vector pointing from the location to the target
    
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(maxspeed);
    // Steering = Desired minus velocity
    PVector steer = PVector.sub(desired,velocity);
    steer.limit(maxforce);  // Limit to maximum steering force
    
    return steer;
  }

  // Separation
  // Method checks for nearby vehicles and steers away
  PVector separate (ArrayList<Vehicle> vehicles) {
    float desiredseparation = r;
    PVector sum = new PVector();
    int count = 0;
    // For every boid in the system, check if it's too close
    for (Vehicle other : vehicles) {
      float d = PVector.dist(location, other.location);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        PVector diff = PVector.sub(location, other.location);
        diff.normalize();
        diff.div(d);        // Weight by distance
        sum.add(diff);
        count++;            // Keep track of how many
        hadCollision = true;
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      sum.div(count);
      // Our desired vector is the average scaled to maximum speed
      sum.normalize();
      sum.mult(maxspeed);
      // Implement Reynolds: Steering = Desired - Velocity
      sum.sub(velocity);
      sum.limit(maxforce);
    }
    return sum;
  }


  // Method to update location
  void update() {
    // Update velocity
    velocity.add(acceleration);
    // Limit speed
    velocity.limit(maxspeed);
    location.add(velocity);
    // Reset accelertion to 0 each cycle
    acceleration.mult(0);
  }

  void display() {
    var fillAlpha = ((frameCount * 5) <= 255) ? (frameCount * 5): 255;
    noStroke();
    if (hadCollision == true) {
      fill(97, 194, 39, fillAlpha);  
      hadCollision = false;
    } else {
      fill(50, 50, 50, fillAlpha);  
    }
    
    pushMatrix();
    translate(location.x, location.y);
    ellipse(0, 0, r, r);
    popMatrix();
  }

}