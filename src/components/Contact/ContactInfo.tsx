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
            <p className="text-gray-600 mb-1">Hotline: 0988.678.938</p>
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
            <p className="text-gray-600 mb-1">tttuanttvl@gmail.com</p>
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
            Thôn 18, xã Vị Xuyên, tỉnh Tuyên Quang
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
            <p className="text-gray-600 mb-1">7:30 - 17:30</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
