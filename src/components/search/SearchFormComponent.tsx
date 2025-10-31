"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGraves } from "@/services/graves-search";
import { GraveFilter } from "@/types/graves";
import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
import { Search, RotateCcw } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

export default function SearchFormComponent({
  value,
  onSubmit,
  onReset,
}: {
  value: GraveFilter;
  onSubmit: (f: GraveFilter) => void;
  onReset: () => void;
}) {
  const [form, setForm] = useState<GraveFilter>(value);
  useEffect(() => {
    setForm(value);
  }, [value]);

  const handleInput = (k: keyof GraveFilter, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const submit = () => {
    onSubmit(form);
  };
  const reset = () => {
    onReset();
  };

  const onKeyDownSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="space-y-6">
      {/* ===== Search Card ===== */}
      <Card className="mb-2 border-2 border-memorial-red/20 shadow-[var(--shadow-memorial)] bg-card/90 backdrop-blur-sm">
        <CardContent>
          <form onKeyDown={onKeyDownSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="soldierName">Tên liệt sĩ</Label>
                <Input
                  className="bg-white"
                  id="soldierName"
                  value={form.soldier_name}
                  onChange={(e) => handleInput("soldier_name", e.target.value)}
                  placeholder="Nhập tên liệt sĩ"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="origin">Nguyên quán</Label>
                <Input
                  className="bg-white"
                  id="origin"
                  value={form.origin}
                  onChange={(e) => handleInput("origin", e.target.value)}
                  placeholder="Nhập nguyên quán"
                />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="newOrigin">
                  Nguyên quán (theo nghị quyết mới)
                </Label>
                <Input
                  className="bg-white"
                  id="newOrigin"
                  value={form.new_origin}
                  onChange={(e) => handleInput("new_origin", e.target.value)}
                  placeholder="Nhập nguyên quán mới"
                />
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="birthYear">Ngày sinh</Label>
                <Input
                  className="bg-white"
                  id="birthYear"
                  value={form.birth_year}
                  onChange={(e) => handleInput("birth_year", e.target.value)}
                  placeholder="Nhập năm sinh"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitName">Đơn vị</Label>
                <Input
                  className="bg-white"
                  id="unitName"
                  value={form.unit_name}
                  onChange={(e) => handleInput("unit_name", e.target.value)}
                  placeholder="Nhập đơn vị"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deathTime">Ngày hy sinh</Label>
                <Input
                  className="bg-white"
                  id="deathTime"
                  value={form.death_time}
                  onChange={(e) => handleInput("death_time", e.target.value)}
                  placeholder="Nhập ngày hy sinh"
                />
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={submit}
                  className="bg-[#087443] hover:bg-[#07683C] hover:cursor-pointer active:bg-[#065D36] text-white transition-colors duration-200"
                >
                  <Search className="w-4 h-4" />
                  Tra cứu
                </Button>
                <Button
                  type="button"
                  onClick={reset}
                  variant="outline"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Làm mới
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
