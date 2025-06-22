# What is Beepcrypt?
A site for morse code
And why is the name this weird?
It's cuz Beep - beeping morse code and crypt - encryption? idk

### Live site:
https://beepcrypt.vercel.app try it, but don't nuke it

### What it do?
So, you don't know what the hell can you do with morse code? No problem, i don't too!
- [COOLEST] randomise morse code with keys and kinda "encrypt" it!
- [cool] translate morse code to text
- [cool] translate text to morse code
- [VERY COOL] listen to morse code!!!
- [edgy] profanity leaderboard

Are you impressed yet? YES?? I hear right?? That's what i thought. you are impressed!
### What to do now?
1. Drop me a star on github: https://github.com/yehorscode/Beepcrypt
2. Follow me on SoM and give me points plz https://summer.hackclub.com/projects/1419
I really want to earn that framework laptop ❤️
3. Have fun!

### How to self run
Monocomand:
```bash
git clone https://github.com/yehorscode/Beepcrypt.git Beepcrypt && cd Beepcrypt && npm i && npm run dev
```

Or do it manually:
first step: clone the repo
```bash
git clone https://github.com/yehorscode/Beepcrypt.git Beepcrypt
```
or
```bash
gh repo clone yehorscode/Beepcrypt Beepcrypt
```

second step: install the packages and cd into Beepcrypt
```bash
cd Beepcrypt
```
```bash
npm i
```

third step: run the app
```bash
npm run dev
```

Don't have linux? skill issue, For windows instructions r similar

### ENV setup
To run leaderboard you need to setup your env file! How to?
Have appwrite! I don't know how to make appwrite run locally i just use the cloud one (free tier)

Databases:
    name: apps

Collections:
    scoreboard_profanity:
        Attributes:
            username: string, required
            profanityCount: integer, required
            ip: string

Env file example: EXAMPLE VALUES CHANGE WITH YOURS
```env
VITE_APPWRITE_PROJECT_ID = "234hjb23h55h32gh23g5"
VITE_APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1"
```

## Got issues?
Dm: @.egorro (on discord)
Or find "yehor" with a Kiwifruit in the avatar on hackclub's slack