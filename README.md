# Mama Mia Pizzaria

Pizza selling game. Work in Progress


## Documentation & Reminders


### Sorskoot Interaction Framework.

WLE CollisionGroups:

  1) Hand collisions. Add objects to this group with a grabbable to enable them to be picked up. Snapzones do not have this group.
  2) Object/Snapzone collisions. Objects that need to interact with other objects or snapzones are in this group.
  3) Finger tip Collisions. Buttons etc that need to be pressed or touched with the tip of the index finger are in this group.

WLE PhysxGroups:

  *Dynamic* - contains objects that switch between kinematic and not. These objects can be picked up and dropped.
  *Static* - contains objects that do not move, but need to preven dynamic objects to fall through them, for example the floor. These block 'dynamic'.



