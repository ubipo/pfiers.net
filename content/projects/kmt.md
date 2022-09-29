---
name: Kinect Mouse Tracker
shortDescription: |
  NERF internship project to deduce a mouse's position from live Microsoft 
  kinect depth data.
technologies:
  - Perception
  - C++
gitUrl: https://github.com/ubipo/kmt
image:
  url: c:projects/kmt.webp
  alt: Two screenshots of the Andin android application, showing a building and a room.
---

In september 2018 I got the opportunity to do a 4-week internship with [Karl
Farrow's lab](https://www.nerf.be/research/nerf-labs/karl-farrow-lab) at
[NERF](https://www.nerf.be) (Neuro-Electronics Research Flanders). The main
focus of Farrow Lab is "Dissecting the lines of communication connecting the eye
with behaviour". To achieve this the lab uses several behavioural set-ups. Among
these is the one Anna Chrzanowska uses in her PhD research, with monitors on
multiple sides of an open pen. See the first prototype I helped build below. 

To collect experimental data and/or change visual stimulation patterns in
real-time it is necessary to know the mouse's position in the pen. That's why a
Microsoft Kinect was mounted under the pen, to act as an infrared depth sensor.
The data this sensor outputs is then processed by the application, that I
developed: *Kinect Mouse Tracker*. Written in [C++](/technologies/cpp), this app
uses the [OpenCV](https://opencv.org/) [computer
vision](/technologies/perception) library to determine and record the mouse's
postion with a delay of only ~50ms.

![Picture of the experimental setup, showing the enclosed pen with monitors on
three sides.](c:projects/kmt-setup-cropped.jpg "Experimental setup, showing
monitors on three sides")

![Screen capture of the application with a mouse outlined.](c:projects/kmt.jpg
"Application preview output")
