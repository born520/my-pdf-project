const fetch = require('node-fetch');

const API_KEY = process.env.API_KEY; // Vercel 환경 변수 사용

module.exports = async (req, res) => {
    const { fileId } = req.query;
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('PDF 다운로드 실패');
        const pdfBuffer = await response.buffer();
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('에러:', error);
        res.status(500).send('PDF를 불러올 수 없습니다.');
    }
};
