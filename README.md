## Requirements  
[Git](https://git-scm.com)  
[Node.js](https://nodejs.org)

## Cloning  
Step 1:
> Click "Clone or download" and click the clipboard icon.
![](https://cdn.discordapp.com/attachments/248014822082347008/393370824943599616/Untitled.png)
![](https://cdn.discordapp.com/attachments/248014822082347008/393371406844559369/Untitled.png)

Step 2:
> After you've got the clone URL, open your terminal and type `cd Desktop`.
![](https://cdn.discordapp.com/attachments/248014822082347008/393372219897675777/Untitled.png)

Step 3:
> Assuming you still got your terminal open, type `git clone` and paste the URL you copied before, it should look like the following:  
`git clone https://github.com/aerisDoesCodes/Random-Cat.git`.
![](https://cdn.discordapp.com/attachments/248014822082347008/393373480009072641/Untitled.png)

## Installing dependents  
```
$ npm i
```

## Starting Bot  
```
$ pm2 start bot.js --name "cat"
```

## Extra  
Don't forget to change the config.example.json file to config.json once you've put your details in.

Cats are grabbed and returned via the following API:  
[random.cat](https://random.cat/meow).
