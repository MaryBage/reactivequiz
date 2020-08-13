import React, { useReducer, useContext } from 'react';
import axios from '../../../../../axios/axios-quiz';
import { DbContext } from './dbContext';
import { dbReducer } from './dbReducer';
import { UserContext } from '../user/userContext';
import { GET_DATA, UPDATE_DATA, DELETE_DATA, SET_LOADER } from "../types";


export const DbState = ({ children }) => {
    const { id } = useContext(UserContext)

    const initialState = {
        questions: [],
        loading: false
    }

    const [state, dispatch] = useReducer(dbReducer, initialState)

    const addData = async (data) => {
        setLoader();

        const res = await axios.post('/data.php', JSON.stringify({ userId: id }))

        let payload = Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id: key
            }
        })

        dispatch({
            type: GET_DATA,
            payload
        })
    }

    const getData = async () => {

        setLoader();
        const res = await axios.post('/data.php', btoa(JSON.stringify({ action: 'get', creator: id })))
        //console.log(res.data)
        const payload = res.data.map((questionItem) => {
            return {
                questionId: questionItem.questionId,
                questionDbId: questionItem.questionDbId,
                question: questionItem.question,
                code: questionItem.code,
                type: questionItem.type,
                difficulty: questionItem.difficulty,
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

        const res = await axios.post('/data.php', btoa(JSON.stringify({
            action: 'delete',
            creator: id,
            dataToDelete: dataToDelete,
            id: dbId
        })))

        getData();
    }

    const setLoader = () => dispatch({ type: SET_LOADER })

    return (
        <DbContext.Provider value={{
            addData, getData, updateData, deleteData, setLoader, questions: state.questions, loading: state.loading,
        }}>
            {children}
        </DbContext.Provider>
    )
}