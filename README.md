# openGLProjects...
=============

elastic_colli.exe has only elastic colli

elasticGravity.exe makes balls attract each other

Release.exe with full feature (could be effect by editing options.txt) 
=========================Control=========================

#WASD to walk ,ESC to close
Ctrl to Speed up
Mouse Left Click to spawn Sphere 

R to Clear all Sphere

Tab to switch the BallType (Red one has Positive Eletric and Blue one has Negative Eletric)
Press g to turn on/off the gravity
There's a option.txt stored mutiple option num,you can customize them if u want 
=========================Notes=========================

Mouse will be locked to the center of the window 
The small green ball is the center of the mass of the all spheres
========================Options.txt========================

GravityValue: 60.0                //determines Gravity     
GravityConstant: 0.2              //The Ball to Ball attraction Constant 
ElectricConstant: 2.0             //The ElectricBall to ElectricBall attraction Constant
MaxSphereScale: 2.0               //The maximum Sphere Scale when spawning Ball 
MinSphereScale: 1.0               //The minimum Sphere Scale when spawning Ball 
MaxSphereInitiateSpeed: 1.0       //The maximum initiate sphere speed scale when spawning Ball
MinSphereInitiateSpeed: 1.0       //The minimum initiate sphere speed scale when spawning Ball
SpeedYScaleWhenHitGround: 0.6     //When the Sphere hit the ground how much Velocity it'll loss 
