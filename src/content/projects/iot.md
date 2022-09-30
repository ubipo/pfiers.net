---
name: IoT
shortDescription: |
  All my IoT projects: water usage monitoring, smartifying old space heaters or 
  garage gates, dimming lamps and more!
technologies:
  - Perception
  - Deep learning
  - Microcontrollers
  - C++
  - Python
  - Rust
image:
  url: c:projects/iot-collage.webp
  alt: |
    Picture of the Esp Water Meter PCB, showing circuitry and a small camera.
    The bottom-right of image also shows digits being recognized by the neural 
    net.
---

I've created my fair share of IoT projects, mostly to solve small inconveniences
that don't *reaaaaly* need solving 😅. But hey, that's what IoT is for, and I
got the learn a ton along the way!


## Water usage monitoring

This first project is probably the most useful one. Using an
[Arducam](https://www.arducam.com/) and
[ESP8266](https://www.espressif.com/en/products/socs/esp8266) microcontroller, I
created a small device to monitor our water meter at home.

The pictures that the camera captures are uploaded to a Python
[Flask](https://flask.palletsprojects.com) server which runs them through a
self-trained (but pre-build) [PyTorch](https://pytorch.org/) neural net. This
server runs on my [ODROID-H2](https://www.hardkernel.com/shop/odroid-h2/) home
server. Creating the PCB in [EasyEDA](https://easyeda.com/) was also my first
foray into PCB design.

![Picture of the Esp Water Meter PCB, showing circuitry and a small camera. The
bottom-right of image also shows digits being recognized by the neural
net.](c:projects/ewam-with-recognition.webp "PCB of the device and an example of
digits being recognized")


## Smartifying an old space heater

This one was a lot of fun. I used an off-the-shelf 4-relay ESP module to control
an old wall-mounted space heater in my dorm room. One of the relays was wired in
parallel with the heater's original switch, and was controlled from a
[HomeAssistant](https://www.home-assistant.io/) server running on a Raspberry
PI. That server also connected to a [bluetooth air quality/temperature
sensor](https://aranet.com/products/aranet4/), effectively acting as a smart
thermostat. I designed the case for the ESP module in [Fusion
360](https://www.autodesk.com/products/fusion-360/overview) and printed it at a
local maker space.

<video width="320" controls>
  <source src="/content/projects/space-heater-video.mp4" type="video/mp4">
</video> 

![Picture of the 3D-printed case for the ESP module mounted next to the
heater](c:projects/space-heater-box.jpg "3D-printed case for the ESP module
mounted next to the heater")


## Hacking + smartifying a garage gate

This was an assignment for the *Security* module in the last year of my
Bachelor's. I used a [software defined
radio](https://www.realtek.com/en/products/communications-network-ics/item/rtl2832u)
to sniff the communication between a remote control and its garage gate. After
decoding the rolling code in the transmission using [Universal Radio
Hacker](https://github.com/jopohl/urh), I was able to replay it using a [generic
433MHz transmitter](https://www.adafruit.com/product/3071). If miniaturized,
this system could be installed near the gate and collect rolling codes whenever
an authorized user opens the garage gate. This way, the attacker can open the
gate at any later time. [The presentation
slides](/content/projects/gate-RF-replay.pdf) contain diagrams to explain the
attack.

<video controls preload="metadata" style="width: 100%;">
  <source src="/content/projects/gate-rf-replay-demo.mp4" type="video/mp4" />
  <track
    label="English"
    kind="subtitles"
    srclang="en"
    src="/content/projects/gate-rf-replay-demo.vtt"
    default />
</video>

Of course I had no personal need for this attack because I already had a remote
for the gate. Being the lazy software developer I am however, it did get me
thinking about how nice it would be to be able to open the gate from my phone.
So of course I soldered a relay to the remote control and hooked it up to the
HomeAssistant server in my dorm room.

![Picture of a relay connected to the gate's remote
control](c:projects/gate-relay.jpg "Relay hooked up to the remote control")


## Dimming lamps and controlling LED strips

Besides all of the above, I've also used IoT to dim lamps, control LED strips
and hook into light switches. All those mini projects are some combination of
taking a cheap ESP module, connecting it to a relay or breakout board and
hooking it up to HomeAssistant. Below for example is a video of me controlling a
dimmer circuit that I connected to an Ikea lamp.

When it comes to the firmware on the ESP modules, I've used pre-built HTTP
libraries, written my own HTTP server, used MQTT, written a custom UDP protocol,
and eventually settled on just using [ESPHome](https://esphome.io/) or
[Tasmota](https://tasmota.github.io/docs/) for most projects.

<video controls style="width: 100%;">
  <source src="/content/projects/iot-dimming.mp4" type="video/mp4" />
</video>
