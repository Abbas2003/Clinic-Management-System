import { auth } from "../../../auth"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Mail, MapPin, Phone, Edit, Settings, LogOut } from "lucide-react"
import { redirect } from "next/navigation"

const Profile = async () => {
  const session = await auth()

  if (!session) redirect("/")
    
  const userId = session?.user?._id

  let user = null
  if (userId) {
    try {
      const res = await fetch(`${process.env.BASE_URL || ""}/api/users?id=${userId}`, {
        cache: "no-store",
      })
      const data = await res.json()
      
      user = data.user
      // console.log("user->", user);
    } catch (error) {
      console.error("Failed to fetch user data:", error)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold">Profile Not Found</h2>
              <p className="text-muted-foreground">
                {!session ? "Please log in to view your profile." : "Unable to load profile information."}
              </p>
              <Button variant="outline">{!session ? "Sign In" : "Retry"}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Helper function to get user initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Card */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={user.avatar || user.imgUrl || "/placeholder.svg?height=96&width=96"}
                  alt={user.firstName || "User avatar"}
                />
                <AvatarFallback className="text-2xl font-semibold">
                  {getInitials(user.firstName || user.lastName || "U")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">{user?.firstName + " " + user?.lastName || "User"}</h1>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {user.role && <Badge variant="secondary">{user.role}</Badge>}
                  {user.status && (
                    <Badge
                      variant={user.status === "active" ? "default" : "outline"}
                      className={user.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                    >
                      {user.status}
                    </Badge>
                  )}
                  {user.verified && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <h2 className="text-xl font-semibold">Contact Information</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                {user.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{user.phone}</p>
                    </div>
                  </div>
                )}

                {user.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{user.location}</p>
                    </div>
                  </div>
                )}

                {(user.createdAt || user.joinedAt) && (
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Member Since</p>
                      <p className="text-sm text-muted-foreground">{formatDate(user.createdAt || user.joinedAt)}</p>
                    </div>
                  </div>
                )}
              </div>

              {user.bio && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-2">Bio</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{user.bio}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Quick Actions</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Change Email
              </Button>
              <Separator />
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        {(user.preferences || user.settings || user.lastLogin) && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Account Details</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.lastLogin && (
                  <div>
                    <p className="text-sm font-medium">Last Login</p>
                    <p className="text-sm text-muted-foreground">{formatDate(user.lastLogin)}</p>
                  </div>
                )}

                {user.accountType && (
                  <div>
                    <p className="text-sm font-medium">Account Type</p>
                    <p className="text-sm text-muted-foreground">{user.accountType}</p>
                  </div>
                )}

                {user.language && (
                  <div>
                    <p className="text-sm font-medium">Language</p>
                    <p className="text-sm text-muted-foreground">{user.language}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Profile
