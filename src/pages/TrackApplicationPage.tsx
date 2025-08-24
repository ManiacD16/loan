"use client"

import type React from "react"
import { useState } from "react"

const TrackApplicationPage = () => {
  const [applicationId, setApplicationId] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [applicationStatus, setApplicationStatus] = useState<any>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock application status
    setApplicationStatus({
      id: applicationId,
      status: "Under Review",
      stage: "Document Verification",
      progress: 60,
      steps: [
        { name: "Application Submitted", completed: true, date: "2024-03-01" },
        { name: "Initial Review", completed: true, date: "2024-03-03" },
        { name: "Document Verification", completed: false, date: null },
        { name: "Credit Assessment", completed: false, date: null },
        { name: "Final Approval", completed: false, date: null },
        { name: "Loan Disbursement", completed: false, date: null },
      ],
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-basic-dark mb-4">Track Your Application</h1>
          <p className="text-center text-basic-gray mb-12">
            Enter your application details to check the current status
          </p>

          {!applicationStatus ? (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-basic-dark mb-2">Application ID</label>
                  <input
                    type="text"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    placeholder="Enter your application ID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basic-blue"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-basic-dark mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your registered mobile number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-basic-blue"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-basic-blue hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Track Application
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Application Overview */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-basic-dark">Application #{applicationStatus.id}</h2>
                    <p className="text-basic-gray">Current Status: {applicationStatus.status}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-basic-blue">{applicationStatus.progress}%</div>
                    <div className="text-sm text-basic-gray">Complete</div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div
                    className="bg-basic-blue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${applicationStatus.progress}%` }}
                  ></div>
                </div>

                <div className="text-center">
                  <p className="text-basic-dark font-medium">Currently at: {applicationStatus.stage}</p>
                </div>
              </div>

              {/* Application Steps */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-basic-dark mb-6">Application Timeline</h3>

                <div className="space-y-4">
                  {applicationStatus.steps.map((step: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {step.completed ? "✓" : index + 1}
                      </div>

                      <div className="flex-1">
                        <h4 className={`font-medium ${step.completed ? "text-basic-dark" : "text-basic-gray"}`}>
                          {step.name}
                        </h4>
                        {step.date && <p className="text-sm text-basic-gray">Completed on {step.date}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setApplicationStatus(null)}
                  className="bg-basic-gray hover:bg-gray-600 text-white px-6 py-2 rounded font-medium transition-colors"
                >
                  Track Another Application
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrackApplicationPage
