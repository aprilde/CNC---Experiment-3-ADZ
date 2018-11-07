/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * April's Messy Hack 
 * 
 * 
 */
#include <ArduinoJson.h>
//*****BE SURE TO INSTALL VERSION 5.13.3 OF THE LIBRARY IT INSTALL V6BETA BY DEFAULT 


int button1 = 2;
int button2 = 3;
int button3 = 4;
int button4 = 5;
int ldrPin = A0;  //the pin it is attached to
int startupValue;  //this will hold the value captured at startup to compare to.

unsigned long lastSend;
int sendRate = 50;
void setup() 
{
  Serial.begin(9600);                    //turn on the serial port
  startupValue = analogRead(ldrPin);  //read the value from the light sensor 
  pinMode(button1,INPUT_PULLUP);         //  
  pinMode(button2,INPUT_PULLUP); 
  pinMode(button3,INPUT_PULLUP); 
  pinMode(button4,INPUT_PULLUP); 
  delay(100);
}

void loop() 

{
  int currentLightValue = analogRead(ldrPin);       //read the analog light value
  int buttonValue1 = digitalRead(button1);               //read button1
  int buttonValue2 = digitalRead(button2);               //read button2
  int buttonValue3 = digitalRead(button3);               //read button3
  int buttonValue4 = digitalRead(button4);               //read button4
  //int anaValue = analogRead(analogInPin);                 //read the analog value
 
if(millis()-lastSend>=sendRate)                           //use a timer to stablize the data send
{
////////////////////////////////////////////////////////////send the values to P5 over serial
  DynamicJsonBuffer messageBuffer(200);                   //create the Buffer for the JSON object        
  JsonObject& p5Send = messageBuffer.createObject();      //create a JsonObject variable in that buffer       
  
  p5Send["b1"]=buttonValue1;                               //assign buttonValue to the key "s1" in the json object
  p5Send["b2"]=buttonValue2;
  p5Send["b3"]=buttonValue3;
  p5Send["b4"]=buttonValue4;
  p5Send["s1"]=currentLightValue;                                  //assign anaValue to the key "s2" in the json object 

  p5Send.printTo(Serial);                                 //print JSON object as a string
  Serial.println();                                       //print a \n character to the serial port to distinguish between objects

lastSend = millis();
}  

}
