"use client";

import NavigationControls from '@/components/ui/NavigationControls';

export default function StatsPage() {
    // Mock data for heatmap
    const units = ['IGD', 'ICU', 'Rawat Inap A', 'Rawat Inap B', 'Poli Umum', 'OK'];
    const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

    // Generate random stress levels (1-10)
    const heatmapData = units.map(unit => ({
        unit,
        values: days.map(() => Math.floor(Math.random() * 10) + 1)
    }));

    const getHeatmapColor = (value) => {
        // 1-3 green, 4-6 yellow, 7-8 orange, 9-10 red
        if (value >= 9) return 'bg-red-500';
        if (value >= 7) return 'bg-orange-500';
        if (value >= 4) return 'bg-yellow-400';
        return 'bg-green-400';
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold mb-2">Statistik Rumah Sakit</h1>
                <p className="text-[var(--muted-foreground)]">
                    Gambaran umum tren kesehatan mental di berbagai unit.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6">
                    <h3 className="text-sm font-medium text-[var(--muted-foreground)]">Total Skrining (Minggu Ini)</h3>
                    <div className="text-4xl font-bold mt-2">1,248</div>
                    <div className="text-sm text-green-600 mt-1">↑ 12% dari minggu lalu</div>
                </div>
                <div className="card p-6">
                    <h3 className="text-sm font-medium text-[var(--muted-foreground)]">Peringatan Risiko Tinggi</h3>
                    <div className="text-4xl font-bold mt-2 text-red-600">24</div>
                    <div className="text-sm text-[var(--muted-foreground)] mt-1">Membutuhkan perhatian segera</div>
                </div>
                <div className="card p-6">
                    <h3 className="text-sm font-medium text-[var(--muted-foreground)]">Rata-rata Skor Burnout</h3>
                    <div className="text-4xl font-bold mt-2 text-orange-600">68/100</div>
                    <div className="text-sm text-orange-600 mt-1">Tingkat Risiko Sedang</div>
                </div>
            </div>

            <div className="card p-6">
                <h3 className="text-xl font-semibold mb-6">Heatmap Burnout per Unit</h3>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr>
                                <th className="text-left py-2 px-4 text-sm font-medium text-[var(--muted-foreground)]">Unit</th>
                                {days.map(day => (
                                    <th key={day} className="text-center py-2 px-4 text-sm font-medium text-[var(--muted-foreground)]">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {heatmapData.map((row, i) => (
                                <tr key={i} className="border-t border-[var(--border)]">
                                    <td className="py-3 px-4 font-medium">{row.unit}</td>
                                    {row.values.map((val, j) => (
                                        <td key={j} className="py-3 px-4 text-center">
                                            <div
                                                className={`w-8 h-8 rounded mx-auto flex items-center justify-center text-xs font-bold text-white ${getHeatmapColor(val)}`}
                                                title={`Tingkat Stres: ${val}/10`}
                                            >
                                                {val}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-6 flex gap-4 text-sm justify-end">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-400 rounded"></div> Risiko Rendah</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded"></div> Sedang</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded"></div> Tinggi</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded"></div> Kritis</div>
                </div>
            </div>

            <NavigationControls />
        </div>
    );
}
