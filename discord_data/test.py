
import os
import random

import discord
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
GUILD = os.getenv('DISCORD_GUILD')

client = discord.Client(command_prefix=',', intents=discord.Intents().all())

@client.event
async def on_ready():
    for guild in client.guilds:
        if guild.name==GUILD:
            break
    print(
        f'{client.user} is connected to following guild\n'
        f'{guild.name}(id: {guild.id})'
        )
    
    members='\n - '.join([member.name for member in guild.members])

@client.event
async def on_member_join(member):
    await member.create_dm()
    await member.dm_channel_send(f'Hi {member.name}, welcome to this Discord server')

@client.event
async def on_message(message):
    
    '''To prevent a situation where the bot reads its own message and cause an infinite recursion as the client cannot diffrentiate between 
    a bot and a client we ass this poece of code'''
    if message.author == client.user:
        return

    brooklyn_99_quotes = [
        'I\'m the human form of the 💯 emoji.',
        'Bingpot!',
        (
            'Cool. Cool cool cool cool cool cool cool, '
            'no doubt no doubt no doubt no doubt.'
        ),
    ]

    if message.content == '99!':
        response = random.choice(brooklyn_99_quotes)
        await message.channel.send(response)
    elif message.content=="raiseException":
        raise discord.ClientException
    
    '''Another potential message reading way is to check for a substring inside a message'''
    if "happy birthday" in message.content.lower():
        await message.channel.send("Happy birthday my guy!")
    
    # This is a good example where we can see the bot will recurisvely call 
    # happy birthday since the reponse also contains happy birthday

@client.event
async def on_error(event,*args,**kwargs):
    with open("err.log",a) as file:
        if event==on_message:
            file.write(f'Unhandled Exception: {args[0]}\n')
        else: raise
    
client.run(TOKEN)
