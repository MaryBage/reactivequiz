import React, { useReducer, useContext } from 'react'
import axios from '../../../../../axios/axios-quiz'
import { DbContext } from './dbContext'
import { dbReducer } from './dbReducer'
import {UserContext} from '../user/userContext'
import { GET_DATA, GET_QUIZ, SET_LOADER, GET_STUDENTS } from "../types";


export const DbState = ({ children }) => {
    const { id } = useContext(UserContext)

    const initialState = {
        questions: [],
        quizes: [],
        students: [],
        loading: false
    }

    const [state, dispatch] = useReducer(dbReducer, initialState)

    const addData = async (data) => {
        setLoader();

        const res = await axios.post('/data.php', btoa(JSON.stringify({...data, creator: id, action: 'add'})))
        
        const payload = res.data.map((questionItem) => {
            return {

                questionId: questionItem.questionId,
                questionDbId: questionItem.questionDbId,
                question: questionItem.question,
                code: questionItem.code,
                type: questionItem.type,
                difficulty: questionItem.difficulty,
                category: questionItem.category,
                options: questionItem.options
            }
        });

        dispatch({
            type: GET_DATA,
            payload
        })

    } 

    const getData = async () => {
        setLoader();
        
      const res = await axios.post('/data.php', btoa(JSON.stringify({action: 'get', creator: id})))
     
        const payload = res.data.map((questionItem) => {
            return {

                questionId: questionItem.questionId,
                questionDbId: questionItem.questionDbId,
                question: questionItem.question,
                code: questionItem.code,
                type: questionItem.type,
                difficulty: questionItem.difficulty,
                category: questionItem.category,
                options: questionItem.options
            }
        });

        dispatch({
            type: GET_DATA,
            payload
        })
    }

    const updateData = async (dbId, table, dataToUpdate, newValue) => {
        setLoader();

        const res = await axios.post('/data.php', btoa(JSON.stringify({
            action: 'update',
            creator: id,
            table: table,
            dataToUpdate: dataToUpdate,
            newValue: newValue,
            id: dbId
        })))

        const payload = res.data.map((questionItem) => {
            return {

                questionId: questionItem.questionId,
                questionDbId: questionItem.questionDbId,
                question: questionItem.question,
                code: questionItem.code,
                type: questionItem.type,
                difficulty: questionItem.difficulty,
                category: questionItem.category,
                options: questionItem.options
            }
        });

        dispatch({
            type: GET_DATA,
            payload
        })
    }

    const deleteData = async (dbId, dataToDelete = 'question') => {
        setLoader();
        
        const res = await axios.post('/data.php', btoa(JSON.stringify({
                    action: 'delete', 
                    creator: id, 
                    dataToDelete: dataToDelete, 
                    id: dbId})))

        const payload = res.data.map((questionItem) => {
            return {

                questionId: questionItem.questionId,
                questionDbId: questionItem.questionDbId,
                question: questionItem.question,
                code: questionItem.code,
                type: questionItem.type,
                difficulty: questionItem.difficulty,
                category: questionItem.category,
                options: questionItem.options
            }
        });

        dispatch({
            type: GET_DATA,
            payload
        })
        getQuizes();
    } 

    const addQuizes = async data =>{
        setLoader();
        await axios.post('/quizData.php', btoa(JSON.stringify({...data,creator: id, action: 'add'})))
        getQuizes();
  
    } 

    const getQuizes = async () =>{
        setLoader();
        
      const res = await axios.post('/quizData.php', btoa(JSON.stringify({creator: id, action: 'get'})))
        const payload = res.data.map((quizItem) => {
                    return {
                        dbId: quizItem.id,
                        name: quizItem.name,
                        status: quizItem.status,
                        duration: quizItem.duration,
                        questions: quizItem.questions.split(',')
                        
                    }
                });

        dispatch({
            type:GET_QUIZ,
            payload
        })
    } 

    const updateQuizes = async (data) =>{
        setLoader();

        const res = await axios.post('/quizData.php', btoa(JSON.stringify({
                    action: 'update', 
                    creator: id,
                    ...data})))
        
            const payload = res.data.map((quizItem) => {
                return {
                    dbId: quizItem.id,
                    name: quizItem.name,
                    status: quizItem.status,
                    duration: quizItem.duration,
                    questions: quizItem.questions.split(',')
                    
                }
            });

            dispatch({
                type:GET_QUIZ,
                payload
            })
    } 

    const deleteQuizes = async (dbId) =>{
        setLoader();

        const res = await axios.post('/quizData.php', btoa(JSON.stringify({
                    action: 'delete', 
                    creator: id, 
                    id: dbId})))
        
        const payload = res.data.map((quizItem) => {
            return {
                dbId: quizItem.id,
                name: quizItem.name,
                status: quizItem.status,
                duration: quizItem.duration,
                questions: quizItem.questions.split(',')
                
            }
        });

        dispatch({
            type:GET_QUIZ,
            payload
        })
    } 

    // const getStudents = async () =>{
    //     setLoader();
    //
    //   const res = await axios.post('/students.php', btoa(JSON.stringify({creator: id, action: 'get'})));
    //      const payload = res.data.map((student) => {
    //                  return {
    //                     quizName: student.quizName,
    //                      name: student.name,
    //                      email: student.email,
    //                      quizId: student.quizId,
    //                      result_json: student.result_json,
    //                      score: student.score,
    //                      percentage: student.percentage,
    //                      date: student.date
    //                  }
    //              });
    //
    //      dispatch({
    //          type:GET_STUDENTS,
    //         payload
    //      })
    // }

    const setLoader = () => dispatch({type: SET_LOADER})

    return (
        <DbContext.Provider value={{
            addData, 
            getData, 
            updateData, 
            deleteData, 
            getQuizes,
            addQuizes,
            updateQuizes,
            deleteQuizes,
            setLoader, 
            questions: state.questions,
            quizes: state.quizes,
            loading: state.loading, 
        }}>
            {children}
        </DbContext.Provider>
    )
}

