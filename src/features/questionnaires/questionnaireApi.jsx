// src/features/questionnaires/questionnaireApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiUrl = 'http://localhost:3000/';

const baseQuery = fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});

export const questionnaireApi = createApi({
    reducerPath: 'questionnaireApi',
    baseQuery,
    endpoints: (builder) => ({
        getQuestionnaires: builder.query({
            query: (companyId) => `/questionnaires?companyId=${companyId}`,
        }),
        addQuestionnaire: builder.mutation({
            query: (newQuestionnaire) => ({
                url: '/questionnaires',
                method: 'POST',
                body: newQuestionnaire,
            }),
        }),
        updateQuestionnaire: builder.mutation({
            query: (updatedQuestionnaire) => ({
                url: `/questionnaires/${updatedQuestionnaire.id}`,
                method: 'PATCH',
                body: updatedQuestionnaire,
            }),
        }),
        deleteQuestionnaire: builder.mutation({
            query: (id) => ({
                url: `/questionnaires/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetQuestionnairesQuery,
    useAddQuestionnaireMutation,
    useUpdateQuestionnaireMutation,
    useDeleteQuestionnaireMutation,
} = questionnaireApi;

export default questionnaireApi.reducer;
