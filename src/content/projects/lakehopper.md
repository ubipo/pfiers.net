---
name: Lake­hopper
shortDescription: |
  Work-in-progress autonomous drone that can fly indefinitely by hopping from 
  one lake to the next.
technologies:
  - Perception
  - Robotics
  - Deep learning
  - Python
  - Rust
siteUrl: https://lakehopper.pfiers.net
gitUrl: https://github.com/ubipo/lakehopper
image:
  url: c:projects/lakehopper-ground.webp
  alt: First version of Lakehopper on a workbench
---

[Lakehopper](https://lakehopper.pfiers.net) is my vision for an autonomous drone
that can travel long distances by hopping from one lake to the next, recharging
its batteries each time using solar panels.


As my [Master’s thesis](/content/dissertation.pdf), I developed Lakehopper’s
high-level planning software. This system uses a convolutional neural network to
identify lakes and buildings from aerial imagery. From this, it generates a
navigation graph to calculate the best multi-hop paths between lakes. These
paths avoid build-up areas and restricted airspace. This software uses
[Python](/technologies/python) and [Tensorflow 2](https://www.tensorflow.org/)
to [create and train the
models](https://lakehopper.pfiers.net/vision/README.html). The planner component
that generates the navigation graph and calculates shortest paths is written in
[Rust](/technologies/rust) and also acts as the server for a
pure-[TypeScript](/technologies/typescript) web interface.


In my free time I’m working on the hardware of the drone. The [first
version](https://lakehopper.pfiers.net/design/1/README.html) I developed
unfortunately experienced a ~~crash~~ [rapid unscheduled
disassembly](https://lakehopper.pfiers.net/design/1/README.html#maiden-flight)
on its maiden flight. I’m currently working on the [second
version](https://lakehopper.pfiers.net/design/2/README.html).

![Predictions made by Lakehopper's vision CNN for lake and building
outlines](c:projects/lakehopper-inference.png "Segmentation model predictions
(GT: Ground Truth, ENB3: EfficientNetB3, MNV2: MobileNetV2)")

![Screenshot of a map with a multi-hop path between lakes planned by
Lakehopper's planning component](c:projects/lakehopper-planner-four-hops.png
"Planner path with four hops between lakes")

![Lakehopper 1 on a workbench](c:projects/lakehopper-ground.webp "Lakehopper 1
on a workbench")

![Screenshot of Lakehopper 2's design in Fusion 360 CAD
software](c:projects/lakehopper-2-preview.png "Preview of Lakehopper 2's design")

![Screenshot of the browser UI to control Lakehopper's planner
software](c:projects/lakehopper-browser-ui.png "Browser UI to the planner
software")

