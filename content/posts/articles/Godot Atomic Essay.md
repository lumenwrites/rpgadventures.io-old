---
slug: godot-atomic-essay
description: Learn to easily come up with interesting character ideas.
tags: ["Ideas", "Roleplaying"]
relatedPosts: ["endless-adventure-ideas"]
date: 2022-02-08
draft: true
---

If you're struggling to come up with interesting character ideas, follow these strategies and you'll have a cool idea for a fun character to roleplay as in no time.

### Take and tweak ideas from your favorite stories
Take your favorite characters from the movies, books, or games you love, and change them in some way:

```gdscript {1-5}
extends RigidBody

var rolling_force = 40

func _ready():
  # Camera is parented to the Ball, but we don't want it to rotate
  # along with the Ball. This line of code tells Godot to ignore the Ball's 
  # transformations, it will be as if the CameraRig is parented to Level01
  $CameraRig.set_as_toplevel(true)

func _physics_process(delta):
  # Move the ball in response to player pressing the buttons.
  # When the button is pressed, we increase the angular velocity 
  # of the RigidBody in the corresponding dierction, making the ball spin.
  # The rest is handled by the physics engine, when the ball spins - it rolls.
  if Input.is_action_pressed("forward"):
    angular_velocity.x -= rolling_force*delta
  elif Input.is_action_pressed("back"):
    angular_velocity.x += rolling_force*delta
  if Input.is_action_pressed("left"):
    angular_velocity.z += rolling_force*delta
  elif Input.is_action_pressed("right"):
    angular_velocity.z -= rolling_force*delta
```

**Combine characteristics of two different characters** into one. 
> A squirrel from Over the Hedge with the skill set and costume of Zorro.

Google the lists of the top TV/Movie characters, pick your favorite ones, and experiment with changing them in interesting ways, or recombining the interesting aspects of these characters into something new.

### Start by choosing your appearance
Search websites like  [ArtStation](https://www.artstation.com/search?sort_by=likes&category_ids=65&medium_ids=1), and [Pinterest](https://www.pinterest.com/search/pins/?q=fantasy%20character%20design&rs=typed&term_meta[]=fantasy%7Ctyped&term_meta[]=character%7Ctyped&term_meta[]=design%7Ctyped) for things like "Fantasy Character Design", "Paladin", "Ranger", etc. Or view the top posts on [/r/ImaginaryCharacters](https://www.reddit.com/r/ImaginaryCharacters/top/?sort=top&t=all). 

Find an image you find inspiring, and use it as a foundation of your character idea.

### Start with a superpower
Finally, you can start with a cool occupation, fantasy race, or a superpower you'd like to have, and build a character around that.

### Be yourself
If all else fails - you can always just play as a fantasy version of yourself.