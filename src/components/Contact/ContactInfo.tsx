import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
          <MessageCircle className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Thông tin liên hệ</h3>
      </div>

      <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
            <Phone className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Điện thoại</h4>
            <p className="text-gray-600 mb-1">Hotline: 1900 1234</p>
            <p className="text-gray-600">Mobile: 0123 456 789</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Email</h4>
            <p className="text-gray-600 mb-1">info@ntlsvx.com</p>
            <p className="text-gray-600">support@ntlsvx.com</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Địa chỉ</h4>
            <p className="text-gray-600">
              123 Đường ABC, Quận XYZ<br />
              Thành phố Hồ Chí Minh, Việt Nam
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Giờ làm việc</h4>
            <p className="text-gray-600 mb-1">Thứ 2 - Thứ 6: 8:00 - 17:30</p>
            <p className="text-gray-600">Thứ 7: 8:00 - 12:00</p>
            <p className="text-gray-600">Chủ nhật: Nghỉ</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
