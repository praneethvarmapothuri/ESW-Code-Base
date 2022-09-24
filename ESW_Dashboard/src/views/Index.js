/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState, useEffect } from "react";
import axios from "axios";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import HeatMap from "react-heatmap-grid";

import Header from "components/Headers/Header.js";

const Index = (props) => {
  // const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [chartExample1Data2, setChartExample1Data2] = useState("data2");
  const [chartExample1Data3, setChartExample1Data3] = useState("data3");
  const [chartExample2Data1,setChartExample2Data1] = useState("data1") ;
  const [Mot,setMot] = useState([]) ;

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  function toMatrix(arr, width) {
    return arr.reduce(function(rows, key, index) {
      return (
        (index % width == 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows
      );
    }, []);
  }
  
  const [y_heat, setY_heat] = useState([]);
  const [x_heat, setX_heat] = useState([]);
  const [y_pir, setY_pir] = useState([]);
  const [peop,setpeop] = useState([]) ;
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  const xLabels = new Array(8).fill(0).map((_, i) => `${i}`);
  
  // Display only even labels
  const xLabelsVisibility = new Array(8)
    .fill(0)
    .map((_, i) => (0 ? true : false));
  
  const yLabels = ["", "", "", "", "", "", "", ""];
  let data1 = null ;
  data1 = new Array(8)
    .fill(0)
    .map(() =>
      new Array(xLabels.length).fill(0).map(() => getRandomArbitrary(25, 27))
    );
  

  console.log(data1, "hello");
  
  const data2 = new Array(8)
    .fill(0)
    .map(() =>
      new Array(xLabels.length).fill(0).map(() => getRandomArbitrary(25, 27))
    );
  
  const data3 = new Array(8)
    .fill(0)
    .map(() =>
      new Array(xLabels.length).fill(0).map(() => getRandomArbitrary(25, 27))
    );
  
  const data4 = new Array(8)
    .fill(0)
    .map(() =>
      new Array(xLabels.length).fill(0).map(() => getRandomArbitrary(25, 27))
    );
  
  const data5 = new Array(8)
    .fill(0)
    .map(() =>
      new Array(xLabels.length).fill(0).map(() => getRandomArbitrary(25, 27))
    );
  
  const data6 = new Array(8)
    .fill(0)
    .map(() =>
      new Array(xLabels.length).fill(0).map(() => getRandomArbitrary(25, 27))
    );

  useEffect(() => {
    var datee;
    axios
      .get(
        "https://api.thingspeak.com/channels/1587139/feeds.json?api_key=0M1ERT6S15KMJQNK"
      )
      .then((response) => {
        let x1 = [];
        let y1 = [];
        let pir = [];
        let people = [] ;
        let hrpeople = [0,0,0,0,0,0,0,0,0] ;
        let daypeople = [0,0,0,0,0,0,0,0,0] ;
        console.log(response, "wow");
        let hravg = 0 ;
        let numdata = 0 ;
        let numd = 0 ;
        let ddavg = 0 ;
        let num_people = [0,0,0,0,0,0,0,0,0] ;
        let num_day_people = [0,0,0,0,0,0,0,0,0] ;
        let n = response.data.feeds.length ;
        console.log("bye","hello") ;
        let cnt = 1 ;
        response.data.feeds.forEach((sample) => {
          const dateToTime = (date) =>
            date.toLocaleString("en-IN", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            });
          datee = sample.created_at;
          const localDate = new Date(datee);
          var month = localDate.getUTCMonth() + 1; //months from 1-12
          var day = localDate.getUTCDate();

          var newdate =
            "Dt:" +
            day +
            "/" +
            month +
            " T: " +
            `${dateToTime(localDate)}`;
            var f1 = sample.field1;
            var f2 = sample.field2;
            var f3 = sample.field3;
            var f4 = sample.field4;
            if(cnt==n){
              localStorage.setItem('num',sample.field5)
            }
            var mat_data = f1 + "," + f2 + "," + f3 + "," + f4;

            const arr = mat_data.split(",").map((element) => {
              return Number(element);
            });
            var matrix = toMatrix(arr, 8);
            var a = JSON.stringify(matrix);

            // 👇️ [12, 34, 56, 78, 9]
            console.log(a, "array");
            y1.push(matrix);
          // pir.push(sample.field5);
          x1.push(newdate);
          var now = new Date() ;
          var prev = new Date(datee)
          var diff = now.getTime() - prev.getTime();
          var hh = Math.floor(diff / 1000 / 60 / 60);
          var dd = Math.floor(hh/24) ;
          console.log(hh,"helloprend") ;
          console.log(dd) ;
          if(hh<=9){
            hrpeople[hh]=hrpeople[hh]+Number(sample.field5) ;
            console.log(hh,"helloprend")
            num_people[hh] = num_people[hh]+1 ;
          }

          if(dd<=9){
            daypeople[dd]=daypeople[dd]+Number(sample.field5) ;
            num_day_people[dd]=num_day_people[dd]+1 ;
          }

          console.log(num_people,"helloprend")
          if(hh==0){
            hravg = hravg+Number(sample.field5) ;
            numdata=numdata+1 ;
          }

          if(dd<1){
            ddavg = ddavg +Number(sample.field5) ;
            numd = numd+1 ;
          }
          if(n-cnt<=9){
            people[n-cnt] = Number(sample.field5) ;
          }
          cnt=cnt+1 ;
        });
        setpeop(people) ;
        for(var i=0;i<hrpeople.length;i++){
            if(num_people[i]!=0){
              hrpeople[i]=hrpeople[i]/num_people[i] ;
            }
        }

        for(var i=0;i<daypeople.length;i++){
          if(num_day_people[i]!=0){
            daypeople[i]=daypeople[i]/num_day_people[i] ;
          }
        }
        console.log(hrpeople,"helloprends") ;
        setY_heat(y1);
        // setY_pir(pir);
        setX_heat(x1);
        console.log(y1,"matr")
        console.log(hravg) ;
        console.log(numdata) ;
        localStorage.setItem('hravg',(hravg/numdata).toFixed(2)) ;
        localStorage.setItem('ddavg',ddavg/numd) ;
        localStorage.setItem('people',JSON.stringify(people.reverse())) ;
        localStorage.setItem('hrpeople',JSON.stringify(hrpeople.reverse()))  ;
        localStorage.setItem('daypeople',JSON.stringify(daypeople.reverse())) ;
        console.log(people,"helloprends")
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(()=>{
    axios.get("https://api.thingspeak.com/channels/1871849/feeds.json?api_key=X703R4J3RC24GQ2L").then((response)=>{
      let feeds = response.data.feeds
      var n = feeds.length 
      var itr = 1 ;
      let motion = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      feeds.forEach((sample)=>{
        if(n-itr<=29){
          motion[n-itr]=Number(sample.field1==1 ? 1 : 0.1) ;
        }
        itr=itr+1 ;
      })
      setMot(motion)
      // localStorage.setItem('motion',JSON.stringify(motion))
      // console.log(localStorage.getItem('motion'),"local")
    })
  },[])
  chartExample2.data1.datasets[0].data=Mot

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  console.log(data1,"check")
  y_heat.reverse()
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          {/* <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">No of People Detected</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Day</span>
                          <span className="d-md-none">D</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                Chart
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col> */}
          <Col xl="12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">PIR Detection</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                 Chart
                <div className="chart">
                  <Bar
                    data={chartExample2.data1}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h4 className="text-white mb-0">Number of People Detected (Last 10 Readings)</h4>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                Chart
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    // getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h4 className="text-white mb-0">Avg. No. of People Detected per 1 hr (Last 10 Readings)</h4>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                Chart
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data2]}
                    options={chartExample1.options}
                    // getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h4 className="text-white mb-0">Avg. No. of People Detected per 1 day (Last 10 Readings)</h4>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                Chart
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data3]}
                    options={chartExample1.options}
                    // getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="4">
          <HeatMap
              xLabels={xLabels}
              yLabels={yLabels}
              xLabelsLocation={"bottom"}
              xLabelsVisibility={xLabelsVisibility}
              xLabelWidth={200}
              data={y_heat.length >=1 ? y_heat[0] : data1}
              squares
              onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
              cellStyle={(background, value, min, max, data1, x, y) => ({
                background: `rgba(255,110,0, ${1 - (25.5 - value) / 4})`,
                fontSize: "0px",
              })}
              cellRender={(value) => value && `${value}%`}
              title={(value, unit) => `${value}`}
            />
            <h3 style={{ color: "black", marginLeft: "75px" }}>
              Number of People: {peop[9]}
            </h3>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
          <HeatMap
              xLabels={xLabels}
              yLabels={yLabels}
              xLabelsLocation={"bottom"}
              xLabelsVisibility={xLabelsVisibility}
              xLabelWidth={200}
              data={y_heat.length >=2 ? y_heat[1] : data2}
              squares
              onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
              cellStyle={(background, value, min, max, data2, x, y) => ({
                background: `rgba(255,110,0, ${1 - (25.5 - value) / 4})`,
                fontSize: "0px",
              })}
              cellRender={(value) => value && `${value}%`}
              title={(value, unit) => `${value}`}
            />
            <h3 style={{ color: "black", marginLeft: "75px" }}>
              Number of People: {peop[8]}
            </h3>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
          <HeatMap
              xLabels={xLabels}
              yLabels={yLabels}
              xLabelsLocation={"bottom"}
              xLabelsVisibility={xLabelsVisibility}
              xLabelWidth={200}
              data={y_heat.length >=3 ? y_heat[2] : data2}
              squares
              onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
              cellStyle={(background, value, min, max, data3, x, y) => ({
                background: `rgba(255,110,0, ${1 - (25.5 - value) / 4})`,
                fontSize: "0px",
              })}
              cellRender={(value) => value && `${value}%`}
              title={(value, unit) => `${value}`}
            />
            <h3 style={{ color: "black", marginLeft: "75px" }}>
              Number of People: {peop[7]}
            </h3>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="4">
          <HeatMap
              xLabels={xLabels}
              yLabels={yLabels}
              xLabelsLocation={"bottom"}
              xLabelsVisibility={xLabelsVisibility}
              xLabelWidth={200}
              data={y_heat.length >=4 ? y_heat[3] : data3}
              squares
              onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
              cellStyle={(background, value, min, max, data4, x, y) => ({
                background: `rgba(255,110,0, ${1 - (25.5 - value) / 4})`,
                fontSize: "0px",
              })}
              cellRender={(value) => value && `${value}%`}
              title={(value, unit) => `${value}`}
            />
            <h3 style={{ color: "black", marginLeft: "75px" }}>
              Number of People: {peop[6]}
            </h3>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
          <HeatMap
              xLabels={xLabels}
              yLabels={yLabels}
              xLabelsLocation={"bottom"}
              xLabelsVisibility={xLabelsVisibility}
              xLabelWidth={200}
              data={y_heat.length >=5 ? y_heat[4] : data4}
              squares
              onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
              cellStyle={(background, value, min, max, data5, x, y) => ({
                background: `rgba(255,110,0, ${1 - (25.5 - value) / 4})`,
                fontSize: "0px",
              })}
              cellRender={(value) => value && `${value}%`}
              title={(value, unit) => `${value}`}
            />
            <h3 style={{ color: "black", marginLeft: "75px" }}>
              Number of People: {peop[5]}
            </h3>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
          <HeatMap
              xLabels={xLabels}
              yLabels={yLabels}
              xLabelsLocation={"bottom"}
              xLabelsVisibility={xLabelsVisibility}
              xLabelWidth={200}
              data={y_heat.length >=6 ? y_heat[5] : data4}
              squares
              onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
              cellStyle={(background, value, min, max, data6, x, y) => ({
                background: `rgba(255,110,0, ${1 - (25.5 - value) / 4})`,
                fontSize: "0px",
              })}
              cellRender={(value) => value && `${value}%`}
              title={(value, unit) => `${value}`}
            />
            <h3 style={{ color: "black", marginLeft: "75px" }}>
              Number of People: {peop[4]}
            </h3>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
