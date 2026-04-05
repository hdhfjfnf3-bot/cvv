import supabase from './_supabase.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.status(204).end();

    try {
        if (req.method === 'GET') {
            const { data, error } = await supabase
                .from('student_results')
                .select('*')
                .order('sort_order', { ascending: true });
            if (error) throw error;
            return res.status(200).json(data);
        }

        if (req.method === 'POST') {
            const { student_name, revenue, growth_percent, chart_points, note, sort_order } = req.body;
            const { data, error } = await supabase
                .from('student_results')
                .insert({ student_name, revenue, growth_percent, chart_points, note, sort_order })
                .select()
                .single();
            if (error) throw error;
            return res.status(201).json(data);
        }

        if (req.method === 'PUT') {
            const { id, student_name, revenue, growth_percent, chart_points, note, sort_order } = req.body;
            const { data, error } = await supabase
                .from('student_results')
                .update({ student_name, revenue, growth_percent, chart_points, note, sort_order })
                .eq('id', id)
                .select()
                .single();
            if (error) throw error;
            return res.status(200).json(data);
        }

        if (req.method === 'DELETE') {
            const { id } = req.body;
            const { error } = await supabase
                .from('student_results')
                .delete()
                .eq('id', id);
            if (error) throw error;
            return res.status(200).json({ ok: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err) {
        console.error('API error:', err);
        return res.status(500).json({ error: err.message });
    }
}
