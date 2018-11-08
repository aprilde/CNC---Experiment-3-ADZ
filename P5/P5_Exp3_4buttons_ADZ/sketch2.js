//Creation&Computation
//reads 2 sensor value from arduino
//draws a circle based on the analog sensor value
//change the color based on the button
//uses JSON as the protocol
//requires p5.serialcontrol to be running
//and arduino running the SerialInput_1button_1ana sketch

var serial;       //variable to hold the serial port object

var button1;      //this variable will hold the value from "b1"
var button2;
var button3;
var button4;
var lightSen = 0;

var imgBtn1;
var imgBtn2;
var imgBtn3;
var imgBtn4;

var serialPortName = "/dev/cu.usbmodem*";  //FOR PC it will be COMX on mac it will be something like "/dev/cu.usbmodemXXXX"
                              //Look at P5 Serial to see the available ports
function preload(){
    
    realLife1 = loadImage("images/rape.jpg");
    realLife2 = loadImage("images/schoolShooting.jpg");
    realLife3 = loadImage("images/christine-blasey-ford.jpg");
    realLife4 = loadImage("images/prochoice.jpg");
    
    meme1 = loadImage("images/SuccessKid.png");
    meme2 = loadImage("images/NCage.png");
    meme3 = loadImage("images/grump.png");
    meme4 = loadImage("images/Dog.jpg");
    

}

function setup() {
  
  createCanvas(2000,1000);
  //Setting up the serial port
  serial = new p5.SerialPort();     //create the serial port object
  serial.open(serialPortName); //open the serialport. determined 
  serial.on('open',ardCon);         //open the socket connection and execute the ardCon callback
  serial.on('data',dataReceived);   //when data is received execute the dataReceived function
}

function draw() {
console.log(lightSen);
  stroke(0);
    
if(lightSen <= 400)
{
    console.log("BRIGHT!!!!")
    imgBtn1 = realLife1;
    imgBtn2 = realLife2;
    imgBtn3 = realLife3;
    imgBtn4 = realLife4;
}
    else{
        console.log("DARKKK!!!!")
    imgBtn1 = meme1;
    imgBtn2 = meme2;
    imgBtn3 = meme3;
    imgBtn4 = meme4;
    }
  
  if(button1==0)
  {
    tint(255, 127);
  image (imgBtn1,random(0,2000), random(0,1000));
  }

if(button2==0)
  {
    tint(255, 127);
    image (imgBtn2,random(0,2000), random(0,1000));  
  }
        if(button3==0)
  {
    tint(255, 127);
    image (imgBtn3,random(0,2000), random(0,1000));  
    
  }
            if(button4==0)
  {
        tint(255, 127);
      image (imgBtn4,random(0,2000), random(0,1000));   
  }

}


function dataReceived()   //this function is called every time data is received
{
  
var rawData = serial.readStringUntil('\r\n'); //read the incoming string until it sees a newline
    console.log(rawData);                   //uncomment this line to see the incoming string in the console     
    if(rawData.length>=5)                      //check that there is something in the string
    {                                         
      
      button1 = JSON.parse(rawData).b1;       //the parameter value .b1 must match the parameter name created within the arduino file
      button2 = JSON.parse(rawData).b2; 
      button3 = JSON.parse(rawData).b3;
      button4 = JSON.parse(rawData).b4;
    lightSen = JSON.parse(rawData).s1;
    }
}

function ardCon()
{
  console.log("connected to the arduino!! Listen UP");
}


