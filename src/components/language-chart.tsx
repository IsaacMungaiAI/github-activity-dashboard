"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";



const COLORS = ["#FFD700", "#1E90FF", "#32CD32", "#FF6347"];

export default function LanguageChart({ langData }: { langData: { name: string; value: number }[] }) {

    const data = langData.sort((a, b) => b.value - a.value).slice(0, 6); // limit to top 6


    return (
        <Card>
            <CardContent className="p-4">
                <h2 className="font-semibold text-lg mb-4">Languages Used</h2>
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label={({ name }) => name}
                            >
                                {data.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
