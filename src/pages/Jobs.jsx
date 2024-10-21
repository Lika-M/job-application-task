const Jobs = () => {
    return (
        <section className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* <!-- Filter Section --> */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h2 className="text-xl font-bold text-[#00b4d8] mb-4">Персонализирай търсенето</h2>

                    {/* <!-- Way to Work Filter --> */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-blue-1000">Начин на работа</h3>
                        <div className="space-y-2 mt-2">
                            <div>
                                <input type="checkbox" id="remote" className="mr-2" />
                                <label htmlFor="remote">Fully Remote</label>
                            </div>
                            <div>
                                <input type="checkbox" id="hybrid" className="mr-2" />
                                <label htmlFor="hybrid">Hybrid</label>
                            </div>
                            <div>
                                <input type="checkbox" id="onsite" className="mr-2" />
                                <label htmlFor="onsite">On-Site</label>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Experience Level Filter --> */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-blue-1000">Ниво на опит</h3>
                        <div className="space-y-2 mt-2">
                            <div>
                                <input type="checkbox" id="junior" className="mr-2" />
                                <label htmlFor="junior">Junior</label>
                            </div>
                            <div>
                                <input type="checkbox" id="mid" className="mr-2" />
                                <label htmlFor="mid">Regular / Mid</label>
                            </div>
                            <div>
                                <input type="checkbox" id="senior" className="mr-2" />
                                <label htmlFor="senior">Senior</label>
                            </div>
                            <div>
                                <input type="checkbox" id="lead" className="mr-2" />
                                <label htmlFor="lead">Lead / Manager</label>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Filter Button --> */}
                    <button id="filter-btn" className="w-full bg-blue-950 text-white py-2 rounded hover:bg-[#00b4d8]">
                        Приложи филтрите
                    </button>
                </div>

                {/* <!-- Job Listings Section --> */}
                <div className="col-span-3 space-y-6">
                    {/* <!-- Job Post Example --> */}
                    <div className="bg-white p-6 shadow rounded-lg flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-blue-600">JAVA Mid Developer</h3>
                            <p className="text-gray-600">Technologies: <span className="font-semibold">Java, Spring, MySQL, Docker</span></p>
                        </div>
                        <div className="text-gray-500">26.07.2024</div>
                    </div>

                    {/* <!-- Additional Job Post --> */}
                    <div className="bg-white p-6 shadow rounded-lg flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-blue-600">JAVA Regular Developer</h3>
                            <p className="text-gray-600">Technologies: <span className="font-semibold">Java, Hibernate, Kubernetes</span></p>
                        </div>
                        <div className="text-gray-500">23.07.2024</div>
                    </div>

                    {/* <!-- Additional Job Post --> */}
                    <div className="bg-white p-6 shadow rounded-lg flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-blue-600">JAVA Developer</h3>
                            <p className="text-gray-600">Technologies: <span className="font-semibold">Java, Spring Boot, AWS</span></p>
                        </div>
                        <div className="text-gray-500">30.06.2024</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Jobs