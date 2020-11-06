In september 2018 I got the opportunity to do a 4-week internship with [Karl Farrow's lab](https://www.nerf.be/research/nerf-labs/karl-farrow-lab) at [NERF](https://www.nerf.be) (Neuro-Electronics Research Flanders). The main focus of Farrow Lab is "Dissecting the lines of communication connecting the eye with behaviour". To achieve this the lab uses several behavioural set-ups. Among these is the one Anna Chrzanowska uses in her PhD research, with monitors on multiple sides of an open pen. See the first prototype I helped build below. 

To collect experimental data and/or change visual stimulation patterns in real-time it is necessary to know the mouse's position in the pen. For the 2D postion the ir depth sensor of a Microsoft Kinect is used. Processing this data is where the application "Kinect Mouse Tracker" I developed comes in. Written in C++, it uses the computer vision library OpenCV to determine and record the mouse's postion with a delay of a little over 50ms.

![Experimental setup of kmt](c:kmt-setup-cropped.jpg "Setup (enclosed pen)")

![Screen capture of kmt with mouse outlined](c:kmt.jpg "Application preview output")
