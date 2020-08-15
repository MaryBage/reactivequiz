import React, { useReducer, useContext } from 'react'
import axios from '../../../../../axios/axios-quiz'
import { DbContext } from './dbContext'
import { dbReducer } from './dbReducer'
import {UserContext} from '../user/userContext'
import { GET_DATA, GET_QUIZ, SET_LOADER } from "../types";


export const DbState = ({ children }) => {
    const { id } = useContext(UserContext)

    const initialState = {
        questions: [],
        quizes: [],
        loading: false
    }

    const [state, dispatch] = useReducer(dbReducer, initialState)

    const addData = async (data) => {
        setLoader();

        const res = await axios.post('/data.php', btoa(JSON.stringify({...data, creator: id, action: 'add'})))
        console.log(res.data)
        getData();

    } 

    const getData = async () => {
        setLoader();
        
      const res = await axios.post('/data.php', btoa(JSON.stringify({action: 'get', creator: id})))
      //console.log(res.data)
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

        getData();
    }

    const deleteData = async (dbId, dataToDelete = 'question') => {
        setLoader();
        console.log('deleting')
        const res = await axios.post('/data.php', btoa(JSON.stringify({
                    action: 'delete', 
                    creator: id, 
                    dataToDelete: dataToDelete, 
                    id: dbId})))
                console.log(res.data)
        
        getData();
        getQuizes();
    } 

    const addQuizes = async data =>{
        setLoader();
        const res = await axios.post('/quizData.php', btoa(JSON.stringify({...data,creator: id, action: 'add'})))
        return res.data;
  
    } 

    const getQuizes = async () =>{
        setLoader();
        
      const res = await axios.post('/quizData.php', btoa(JSON.stringify({creator: id, action: 'get'})))
      console.log('get quiz',res.data)
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

    const updateQuizes = async (dbId, dataToUpdate, newValue) =>{
        setLoader();

        await axios.post('/quizData.php', btoa(JSON.stringify({
                    action: 'update', 
                    creator: id, 
                    dataToUpdate: dataToUpdate, 
                    newValue: newValue,
                    id: dbId})))
        
        getQuizes();
    } 

    const deleteQuizes = async (dbId) =>{
        setLoader();

        const res = await axios.post('/quizData.php', btoa(JSON.stringify({
                    action: 'delete', 
                    creator: id, 
                    id: dbId})))
        
        getQuizes();
    } 

    

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
            qty: state.questions.length,
            quizes: state.quizes,
            quizesQty: state.quizes.length,
            loading: state.loading 
        }}>
            {children}
        </DbContext.Provider>
    )
}

