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

export const jobsApi = createApi({
    reducerPath: 'jobsApi',
    baseQuery,
    endpoints: (builder) => ({
        getAllJobs: builder.query({
            query: () => '/jobs',
        }),
        getJobs: builder.query({
            query: (companyId) => `/jobs?companyId=${companyId}`,
        }),
        addJob: builder.mutation({
            query: (newJob) => ({
                url: '/jobs',
                method: 'POST',
                body: newJob,
            }),
        }),
        updateJob: builder.mutation({
            query: (updatedJob) => ({
                url: `/jobs/${updatedJob.id}`,
                method: 'PUT',
                body: updatedJob,
            }),
        }),
        deleteJob: builder.mutation({
            query: (id) => ({
                url: `/jobs/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAllJobsQuery,
    useGetJobsQuery,
    useAddJobMutation,
    useUpdateJobMutation,
    useDeleteJobMutation,
} = jobsApi;

export default jobsApi.reducer;
