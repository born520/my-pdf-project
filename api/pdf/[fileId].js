const fetch = require('node-fetch');

const API_KEY = process.env.API_KEY;

module.exports = async (req, res) => {
    const { fileId } = req.query;
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('PDF 다운로드 실패');

        const pdfBuffer = await response.buffer();
        
        // CORS 헤더 추가
        res.setHeader('Access-Control-Allow-Origin', '*'); // 모든 도메인 허용
        // 특정 도메인만 허용하려면: res.setHeader('Access-Control-Allow-Origin', 'https://born520.github.io');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('에러:', error);
        res.setHeader('Access-Control-Allow-Origin', '*'); // 에러 응답에도 CORS 추가
        res.status(500).send('PDF를 불러올 수 없습니다.');
    }
};
