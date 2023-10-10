import pygame
import time
import random
import copy
import sys
import os

# pyinstaller snake_game.py

class Snake:
    game_over = False # boolean variable to keep the status of the game
    game_paused = 0
    snake_list = [] # where to store the points that make up the snake
    snake_head = [] # where the snake head is stored
    snake_len = 1
    obstacle_list = [] # where to store obstacle points
    food = [] # coordinates of food
    width = 500
    height = 500
    thickness = 20
    snake_speed = 15
    snake_block = 10 # size of one snake point
    delta = 10 # by how much the snake moves in one frame
    
    display = [] # pygame display object
    colors = {"red":(255, 0, 0), "blue":(0, 0, 255), "white":(255, 255, 255), "green":(0, 255, 0), "black":(0,0,0)}
    font_style = []
    clock = []    

    def __init__(self, *args):
        if len(args) == 2:
            self.width = args[0]
            self.height = args[1]
        self.snake_head = [self.width/2, self.height/2]
        self.snake_list = []
        self.snake_len = 1
        self.obstacle_list = []
        self.snake_speed = 15
        self.game_over = False

        pygame.init()
        self.font_style = pygame.font.SysFont(None, 20)
        self.display = pygame.display.set_mode((self.width, self.height)) # initialize display size
        self.clock = pygame.time.Clock()
        pygame.display.set_caption("Snake") # name of the header
    
    # expand the snake by adding a head in a new frame
    def expand_snake(self):
        self.snake_list.append(copy.copy(self.snake_head)) # NEED A SHALLOW COPY

    # delete the tail of the snake after moving the head
    def delete_tail(self):
        if(len(self.snake_list) > self.snake_len):
            del self.snake_list[0]

    # check if the new snake head has the same coordinates as a part of the snake body
    # exclude the last element since it is the current snake head
    def check_snake_eat_itself(self):
        for x in self.snake_list[:-1]:
            if x == self.snake_head:
                self.game_over = True
                self.display_message("You Ate Yourself",self.colors["blue"])

    def check_snake_hit_screen(self):
        if (self.snake_head[0] > self.width-2*self.thickness or self.snake_head[0] <= self.thickness or 
                self.snake_head[1] > self.height-2*self.thickness or self.snake_head[1] <= self.thickness):
            self.game_over = True
            self.display_message("You Hit The Screen",self.colors["blue"])

    def check_snake_hit_obstacle(self):
        for obs in self.obstacle_list:
            if self.snake_head[0] == obs[0] and self.snake_head[1] == obs[1]:
                self.game_over = True
                self.display_message("You hit an obstacle", self.colors["blue"])

    def check_snake_ate_food(self):
        if self.snake_head[0] == self.food[0] and self.snake_head[1] == self.food[1]:
            self.make_food()
            self.display_food()
            self.snake_len+=1
            self.snake_speed+=1
            self.make_obstacle()

    def display_food(self):
        pygame.draw.rect(surface = self.display, color = self.colors["green"], 
                rect = [self.food[0], self.food[1], self.snake_block, self.snake_block])

    def display_snake(self):
        # exclude the head since it is gonna be colored red
        for x in self.snake_list[:-1]:
            pygame.draw.rect(self.display, self.colors["blue"], [x[0], x[1], self.snake_block, self.snake_block])
        pygame.draw.rect(self.display, self.colors["red"], 
                [self.snake_head[0], self.snake_head[1], self.snake_block, self.snake_block]) # display head
        #pygame.draw.circle(self.display, self.colors["red"], [self.snake_head[0], self.snake_head[1]], self.snake_block/2)

    def display_obstacles(self):
        for obs in self.obstacle_list:
            pygame.draw.rect(self.display, self.colors["black"], [obs[0], obs[1], self.snake_block, self.snake_block])

    # display a message on the screen
    def display_message(self, message, color):
        mesg = self.font_style.render(message, True, color)
        self.display.blit(mesg, [self.width/3, 0])

    def display_score(self):
        score = self.font_style.render("Your score is: "+str(self.snake_len-1)+"    Snake speed: "+str(self.snake_speed)
            , True, self.colors["black"])
        self.display.blit(score,[0,10])
    
    def display_border(self):
        pygame.draw.rect(self.display, self.colors["black"], [self.thickness, self.thickness, 
                self.width - 2*self.thickness, self.height-2*self.thickness], width = self.snake_block)
    
    def display_button(self):
        surface = pygame.Surface([50, 20])
        surface.fill(self.colors["black"])
        self.display.blit(surface, [0,0])

    def make_food(self):
        # done with the round and division so that the coordinates of the food and snake can match
        # one snake block subtracted so that we don't go out of range
        self.food = []
        self.food = [round(random.randrange(2*self.thickness, self.width - self.snake_block-2*self.thickness)/10)*10,
                        round(random.randrange(2*self.thickness, self.height - self.snake_block-2*self.thickness)/10)*10] # x coordinate and y coordinate
        # Insure that the food isn't spawned onto an obstacle
        for obs in self.obstacle_list:
            if self.food[0] == obs[0] and self.food[1] == obs[1]:
                self.make_food()

    def make_obstacle(self):
        self.obstacle_list.append([round(random.randrange(2*self.thickness, self.width - self.snake_block - 2*self.thickness)/10)*10,
                        round(random.randrange(2*self.thickness, self.height - self.snake_block - 2*self.thickness)/10)*10]) # x coordinate and y coordinate        

    def start_game(self):
        # by how much the snake coordinates change in one frame
        delta_x = 0 
        delta_y = 0
        self.make_food()
        while not self.game_over:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.game_over = True
                    return
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_LEFT or event.key == pygame.K_a:
                        delta_x = -self.delta
                        delta_y = 0
                    elif event.key == pygame.K_RIGHT or event.key == pygame.K_d:
                        delta_x = self.delta
                        delta_y = 0
                    elif event.key == pygame.K_DOWN or event.key == pygame.K_s:
                        delta_x = 0
                        delta_y = self.delta
                    elif event.key == pygame.K_UP or event.key == pygame.K_w:
                        delta_x = 0
                        delta_y = -self.delta
                    elif event.key == pygame.K_p:
                        self.display_message("GAME PAUSED", self.colors["black"])
                        self.game_paused +=1
                    elif event.key == pygame.K_r:
                        self.__init__()
                        self.start_game()
                    elif event.key == pygame.K_q:
                        self.game_over = True
                        return

                
            if self.game_paused % 2 == 0: #while the game is not paused
                self.snake_head[0]+=delta_x
                self.snake_head[1]+=delta_y
                
                self.display.fill(self.colors["white"])
                self.display_border()
                self.display_food()
                self.expand_snake()
                self.delete_tail()
                self.display_snake()
                self.display_obstacles()
                self.check_snake_hit_screen()
                self.check_snake_eat_itself()
                self.check_snake_hit_obstacle()
                self.check_snake_ate_food()
                self.display_score()  
            pygame.display.update()
            self.clock.tick(self.snake_speed) # framerate per second

        pygame.display.update()
        time.sleep(5)
        self.__init__()
        self.start_game()
        #pygame.quit()

#https://stackoverflow.com/questions/54210392/how-can-i-convert-pygame-to-exe
def resource_path(relative_path):
    try:
    # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

game = Snake(1000, 600)
#game = Snake()
game.start_game()
