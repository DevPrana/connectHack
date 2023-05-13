import os
import random

import discord
from dotenv import load_dotenv

from discord.ext import commands

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
GUILD = os.getenv('DISCORD_GUILD')

bot=commands.Bot(command_prefix="!",intents=discord.Intents().all())

@bot.event
async def on_ready():
    print(f'{bot.user.name} has connected to discord')


'''
Any Command function (technically called a callback) must accept at least one parameter, called ctx, 
which is the Context surrounding the invoked Command.
A Context holds data such as the channel and guild that the user called the Command from.
'''
@bot.command(name="99",help="Responds with a brooklyn99 quote chosen randomly")
async def nine_nine(ctx):
    brooklyn_99_quotes = [
        'I\'m the human form of the 💯 emoji.',
        'Bingpot!',
        (
            'Cool. Cool cool cool cool cool cool cool, '
            'no doubt no doubt no doubt no doubt.'
        ),
    ]

    response=random.choice(brooklyn_99_quotes)
    await ctx.send(response)

@bot.command(name='roll_dice', help='Simulates rolling dice.')
async def roll(ctx, number_of_dice: int, number_of_sides: int):
    dice = [
        str(random.choice(range(1, number_of_sides + 1)))
        for _ in range(number_of_dice)
    ]
    await ctx.send(', '.join(dice))

#This takes two arguments as well of the type int which we have to metion specifically using :
#*The format of our command is "!roll_dice 3 6"

@bot.command(name='create-channel')
@commands.has_role('admin')
async def create_channel(ctx, channel_name='real-python'):
    guild = ctx.guild
    existing_channel = discord.utils.get(guild.channels, name=channel_name)
    if not existing_channel:
        print(f'Creating a new channel: {channel_name}')
        await guild.create_text_channel(channel_name)

bot.run(TOKEN)