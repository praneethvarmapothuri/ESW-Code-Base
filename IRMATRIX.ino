#include <Melopero_AMG8833.h>
#include <WiFi.h>
#include "ThingSpeak.h"
#include<HTTPClient.h>

#define CHANNEL_ID 1854295
#define CHANNEL_API_KEY "DO46JCIMQ8ZB8LL8"

#define TEST_CHANNEL1ID 1854977
#define TEST_CHANNEL2ID 1854978
#define TEST_CHANNEL3ID 1854979
#define TEST_CHANNEL4ID 1854980
#define TEST_CHANNEL0ID 1580068

#define TEST_CHANNEL1KEY "73CFDE4P4FWKS7NC"
#define TEST_CHANNEL2KEY "RHEJ0E8K2WAQA0G0"
#define TEST_CHANNEL3KEY "YW2A53KUWV6L5VDR"
#define TEST_CHANNEL4KEY "4VQBQQ346XGNIM0W"
#define TEST_CHANNEL0KEY "NB2Z8TLSWFKLHZUY"

#define MAIN_SSID "Blah"
#define MAIN_PASS "venu12345"
#define CSE_IP "esw-onem2m.iiit.ac.in"
#define CSE_PORT 443
#define OM2M_ORGIN "1JF9#U:Z&XQUA"
#define OM2M_MN "/~/in-cse/in-name/"
#define OM2M_AE "Team-17"
#define OM2M_DATA_CONT1 "Node-1/Data"
#define OM2M_DATA_CONT2 "Node-2/Data"
//#define OM2M_DATA_CONT3 "Node-3/Data"
//#define OM2M_DATA_CONT4 "Node-4/Data"
//#define OM2M_DATA_CONT5 "Node-5/Data"
#define DATA "data"
#define HTTPS false

HTTPClient http ;

Melopero_AMG8833 sensor;
int motion = 0 ;
bool flag = true ; 

WiFiClient client;
const char* ssid = "Blah";   // your network SSID (name) 
const char* password = "venu12345";




 void sendtoom2m(String cont,String data)
 {
    //String data;
    String server = "http://" + String() + CSE_IP + ":" + String() + CSE_PORT + String() + OM2M_MN;

    http.begin(server + String() + OM2M_AE + "/" + cont + "/" );

    http.addHeader("X-M2M-Origin", OM2M_ORGIN);
    http.addHeader("Content-Type", "application/json;ty=4");
    http.addHeader("Content-Length", "100");

    //data = "[" + String(epochTime) + ", " + String(occupancy) + ", " + String(distance) +   + "]"; 
    String req_data = String() + "{\"m2m:cin\": {"

      +
      "\"con\": \"" + data + "\","

      +
      "\"lbl\": \"" + "V1.0.0" + "\","

      //+ "\"rn\": \"" + "cin_"+String(i++) + "\","

      +
      "\"cnf\": \"text\""

      +
      "}}";
    int code = http.POST(req_data);
    http.end();
    Serial.println(code);
    delay(35000) ;
 }



void setup() {
  pinMode(5,INPUT) ;
  Serial.begin(115200);
   WiFi.begin(ssid,password); 
   while(WiFi.status()!=WL_CONNECTED)
   {
     delay(500);
     Serial.print(".");
   }
   Serial.println("\nConnected.");
  Serial.println(WiFi.localIP());
  ThingSpeak.begin(client);  

  // initializing I2C to use default address AMG8833_I2C_ADDRESS_B and Wire (I2C-0):
  Wire.begin();
  sensor.initI2C();
  // To use Wire1 (I2C-1):
  // Wire1.begin();
  // sensor.initI2C(AMG8833_I2C_ADDRESS_B, Wire1);

  Serial.print("Resetting sensor ... ");  
  int statusCode = sensor.resetFlagsAndSettings();
  Serial.println(sensor.getErrorDescription(statusCode));

  Serial.print("Setting FPS ... ");
  statusCode = sensor.setFPSMode(FPS_MODE::FPS_10);
  Serial.println(sensor.getErrorDescription(statusCode));
}

void loop() {
  motion  = digitalRead(5) ;
  if(1){
        Serial.println("Motion Detected") ;
  Serial.print("Updating thermistor temperature ... ");
  int statusCode = sensor.updateThermistorTemperature();
  Serial.println(sensor.getErrorDescription(statusCode));

  Serial.print("Updating pixel matrix ... ");
  statusCode = sensor.updatePixelMatrix();
  Serial.println(sensor.getErrorDescription(statusCode));

  Serial.print("Thermistor temp: ");
  Serial.print(sensor.thermistorTemperature);
  Serial.println("°C");

  Serial.println("Temperature Matrix: ");
  String Data1 = "" ;
  String Data2="" ;
  String Data3="" ;
  String Data4="" ;
  for (int x = 0; x < 8; x++){
    for (int y = 0; y < 8; y++){
      Serial.print(sensor.pixelMatrix[y][x]);
      if(x<2){
        Data1=Data1+sensor.pixelMatrix[y][x] ;
        if(x!=1 or y!=7){
          String comma = "," ;
          Data1=Data1+comma ;
      }
      }
     
      else if(x<4){
        Data2=Data2+sensor.pixelMatrix[y][x] ;
        if(x!=3 or y!=7){
             String comma = "," ;
             Data2=Data2+comma ; 
        }
      }
      else if(x<6){
        Data3=Data3+sensor.pixelMatrix[y][x] ;
        if(x!=5 or y!=7){
          String comma="," ;
          Data3=Data3+comma ;
         }
      }
      else{
        Data4=Data4+sensor.pixelMatrix[y][x] ;
        if(x!=7 or y!=7){
          String comma="," ;
          Data4=Data4+comma ;
        }
      }
      
      }
      
    }
      Serial.println();
  Serial.println(Data1) ;
  Serial.println(Data2) ;
  Serial.println(Data3) ;
  Serial.println(Data4) ;
//  sendtoom2m(String() + OM2M_DATA_CONT1,Data1);
//  sendtoom2m(String() + OM2M_DATA_CONT2,Data2);
//  sendtoom2m(String() + OM2M_DATA_CONT3,Data3);
//  sendtoom2m(String() + OM2M_DATA_CONT2,Data4);
//  sendtoom2m(String() + OM2M_DATA_CONT1,"1"); 
  ThingSpeak.setField(1,Data1);
  ThingSpeak.setField(2,Data2);
  ThingSpeak.setField(3,Data3);
  ThingSpeak.setField(4,Data4);
  ThingSpeak.setField(5,"1");
  int x = ThingSpeak.writeFields(TEST_CHANNEL2ID,TEST_CHANNEL2KEY) ;
  Serial.println("Verify") ;
  Serial.println(x) ;
  flag=true ;
  delay(20000) ;
  }
//  else{
//    if(flag==true){
//      Serial.println("bye") ;
//      sendtoom2m(String() + OM2M_DATA_CONT5,"0"); 
//      ThingSpeak.writeField(TEST_CHANNEL4ID,5,"0",TEST_CHANNEL4KEY) ;   
//      flag=false ;   
//    }
//  }
  }   

 
