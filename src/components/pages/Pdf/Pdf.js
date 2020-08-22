import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const ResultPdf = (props) => {
   
 return  (
    <Document>
      <Page style={styles.body}>
      <View style={styles.row}>
        <Text style={styles.logo}>reActive</Text>
        <View style={styles.table}> 
          {props.userName &&
          <>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>Name</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{props.userName}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>Email</Text> 
              </View> 
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{props.email}</Text>
              </View> 
            </View> 
            <View style={styles.tableRow}>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>Quiz</Text> 
              </View> 
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{props.quizName}</Text>
              </View> 
            </View> 
            </>}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}> 
              <Text style={styles.tableCell}>Score</Text> 
            </View> 
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{props.score} ({Math.round(props.percentage)}%)</Text>
            </View> 
          </View> 
          <View style={styles.tableRow}>
            <View style={styles.tableCol}> 
              <Text style={styles.tableCell}>Date</Text> 
            </View> 
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{props.date}</Text>
            </View> 
          </View> 
      </View>
      </View>
          
       
            {props.res.map(e => {
            return (
                    <>
                      <View style={styles.quizMain} wrap={false}>
                      <View style={styles.question}><Text>{e.question}</Text></View>
                      <View style={styles.answer}>{e.options.map(option => {
                              return (<>
                                      <View style={styles.row}>
                                         <View style={styles.tinyRow}>
                                          <View style={styles.bullet}>
                                            {option.match ? <Text style={styles.bulletTxt}> • </Text>: <Text /> } 
                                          </View>
                                          <Text style={option.type == 'right' ? styles.rightAnswer : {}}>{option.answer}</Text> 
                                        </View> 
                                        <View style={styles.points}>
                                        {option.match ? <Text>{option.point}</Text> : <Text />}
                                        </View>
                                      </View> 
                                      </>
                                    )
                              })}
                       
                      </View>
                      </View>
                    </>
                    )})}

    </Page>
  </Document>
    
  );
 }
          
 
 
  const styles = StyleSheet.create({
    body: {
      paddingTop: 20,
      paddingBottom: 65,
      paddingHorizontal: 35,
      backgroundColor: '#f3f3f3',
      fontFamily: 'Courier'
    },
    logo: {
      width:'50%',
      color: '#000',
      fontSize: 42,
      fontWeight: 'bold',
      letterSpacing: 1,
      textAlign: 'center'
    },
    quizMain: {
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      marginTop: '15px'

    },
    question: {
      padding: '10px',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'flex-start',
      backgroundColor: '#E2DDEE',
      borderStyle: "solid", 
      borderWidth: 4,
      borderColor: '#fff',
      color: '#555555',
      width: '100%',
      fontSize:14,
    },
    answer: {
      padding: '10px',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      borderStyle: "solid", 
      borderWidth: 4,
      borderColor: '#E2DDEE',
      color: '#555555',
      lineHeight: '40px',
      width: '100%'

    },
    bullet: {
      // width: '30px'
    },
    bulletTxt: {
      fontSize:14, 
    },
    points: {
      textAlign: 'right'
    },
    rightAnswer:{ 
      fontSize: 14,
      color: 'green', 
      fontWeight:'bold'
    },
    title: {
      fontSize: 24,
      textAlign: 'center'
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
      
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
      },
    row: {
      padding: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    tinyRow: {
      fontSize: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
      table: { 
        display: "table", 
        width: "50%",  
        borderStyle: "solid", 
        borderWidth: 1, 
        borderRightWidth: 0, 
        borderBottomWidth: 0 
      },
      tableRow: { 
        margin: "auto", 
        flexDirection: "row" 
      }, 
      tableCol: { 
        width: "50%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableCell: { 
        margin: "auto", 
        paddingTop: 5, 
        paddingBottom: 5,
        fontSize: 12
      }
  });
  

export default ResultPdf;