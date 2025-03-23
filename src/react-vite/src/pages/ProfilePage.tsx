import { Button } from "@/components/ui/button";

function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>
      
      <div className="space-y-8">
        {/* Profile Photo Section */}
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            <span className="text-3xl">👤</span>
          </div>
          <div>
            <h3 className="font-medium mb-2">Profile Photo</h3>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700">
                Change
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700">
                Remove
              </button>
            </div>
          </div>
        </div>
        
        {/* Personal Information Section */}
        <div>
          <h3 className="text-xl font-medium mb-4 text-gray-800">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue="Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue="john.doe@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>
        
        {/* Password Section */}
        <div>
          <h3 className="text-xl font-medium mb-4 text-gray-800">Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue="●●●●●●●●"
              />
            </div>
            <div className="md:col-span-2">
              <div className="h-px bg-gray-200 my-2"></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        
        {/* Preferences Section */}
        <div>
          <h3 className="text-xl font-medium mb-4 text-gray-800">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notifications"
                  type="checkbox"
                  className="h-4 w-4 text-orange-500 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="notifications" className="font-medium text-gray-700">
                  Email Notifications
                </label>
                <p className="text-gray-500">
                  Receive email notifications about account activity and updates
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="newsletter"
                  type="checkbox"
                  className="h-4 w-4 text-orange-500 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="newsletter" className="font-medium text-gray-700">
                  Newsletter
                </label>
                <p className="text-gray-500">
                  Receive our monthly newsletter with tips and updates
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
            >
              Cancel
            </button>
            <Button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-amber-500"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;