
import type React from "react"
import { useState } from "react"

type Step = { name: string; completed: boolean; date: string | null }
type AppStatus = {
  id: string
  status: string
  stage: string
  progress: number
  steps: Step[]
}

const TrackApplicationPage = () => {
  const [applicationId, setApplicationId] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [applicationStatus, setApplicationStatus] = useState<AppStatus | null>(null)

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
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-neutral-900 mb-4">
            Track Your Application
          </h1>
          <p className="text-center text-neutral-500 mb-12">
            Enter your application details to check the current status
          </p>

          {!applicationStatus ? (
            <div className="bg-white rounded-md border border-neutral-200 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-800 mb-2">Application ID</label>
                  <input
                    type="text"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    placeholder="Enter your application ID"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-800 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your registered mobile number"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition-colors"
                >
                  Track Application
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Application Overview */}
              <div className="bg-white rounded-md border border-neutral-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-neutral-900">Application #{applicationStatus.id}</h2>
                    <p className="text-neutral-500">Current Status: {applicationStatus.status}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-blue-600">{applicationStatus.progress}%</div>
                    <div className="text-sm text-neutral-500">Complete</div>
                  </div>
                </div>

                <div className="w-full bg-neutral-200 rounded-full h-2 mb-6">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${applicationStatus.progress}%` }}
                  />
                </div>

                <div className="text-center">
                  <p className="text-neutral-900 font-semibold">Currently at: {applicationStatus.stage}</p>
                </div>
              </div>

              {/* Application Steps */}
              <div className="bg-white rounded-md border border-neutral-200 p-8">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6">Application Timeline</h3>

                <div className="space-y-4">
                  {applicationStatus.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed ? "bg-green-500 text-white" : "bg-neutral-300 text-neutral-700"
                        }`}
                      >
                        {step.completed ? "✓" : index + 1}
                      </div>

                      <div className="flex-1">
                        <h4 className={`font-medium ${step.completed ? "text-neutral-900" : "text-neutral-500"}`}>
                          {step.name}
                        </h4>
                        {step.date && <p className="text-sm text-neutral-500">Completed on {step.date}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setApplicationStatus(null)}
                  className="bg-neutral-700 hover:bg-neutral-800 text-white px-6 py-2 rounded-md font-semibold transition-colors"
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
