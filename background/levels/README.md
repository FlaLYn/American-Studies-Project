# Levels Folder

Use this folder for map backgrounds and level-specific assets.

Current structure:

```text
background/levels/level0/background.png
background/levels/level0/background.svg
```

Level 0 is The Archive. The game tries to load `background/levels/level0/background.png` first. If that file is not present, it loads `background/levels/level0/background.svg`.
