import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";

const CountApp = ({ language }) => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    wordCount: 0,
    charCount: 0,
    charCountWithoutSpaces: 0,
    paragraphCount: 0,
    sentenceCount: 0,
    arabicWordCount: 0,
    arabicCharCount: 0,
    runTime: 0,
  });
  const [keywordStats, setKeyWordStats] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const labels = {
    en: {
      words: "Words",
      characters: "Characters",
      charactersWithoutSpaces: "Characters (without spaces)",
      paragraphs: "Paragraphs",
      sentences: "Sentences",
      spaces: "Spaces",
      runTime: "Run Time",
      title: "Word Counter",
    },
    ar: {
      words: "عدد الكلمات",
      characters: "عدد الأحرف",
      charactersWithoutSpaces: "عدد الأحرف (بدون مسافات)",
      paragraphs: " الفقرات",
      sentences: " الجمل",
      spaces: " المسافات",
      runTime: "مدة التشغيل",
      title: "عداد الكلمات",
    },
  };

  const analyzeText = (inputText) => {
    const startTime = performance.now();

    const trimmedText = inputText;

    const charCount = trimmedText.length;

    const charCountWithoutSpaces = trimmedText.replace(/\s/g, "").length;

    const trimmedText0 = trimmedText.trim();
    const wordCount =
      trimmedText0.length > 0
        ? trimmedText0
            .split(/\s+/)
            .filter(Boolean)
            .filter((word) => /[\p{L}\p{N}]/u.test(word)).length
        : 0;

    const paragraphCount = trimmedText
      .replace(/\n$/gm, "")
      .split(/\n/)
      .filter(Boolean).length;

    let sentenceMatch =
      trimmedText.match(/[^.!?\n]*[\p{L}\p{N}]+[^.!?\n]*[.!?](?=\s|$|\n)/gu) ||
      [];

    let remainingText = trimmedText
      .replace(/[^.!?\n]*[\p{L}\p{N}]+[^.!?\n]*[.!?](?=\s|$|\n)/gu, "")
      .trim();

    const remainingLines = remainingText
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(
        (line) =>
          line.length > 0 &&
          (/[\p{L}\p{N}]/u.test(line) ||
            /^[^a-zA-Z0-9\u0600-\u06FF]+$/.test(line)),
      );

    sentenceMatch.push(...remainingLines);

    const sentenceCount = sentenceMatch.length;

    const spacesMatch = trimmedText.match(/ /g);
    const spacesCount = spacesMatch ? spacesMatch.length : 0;

    const wordFrequency = countWordFrequency(trimmedText);

    const endTime = performance.now();
    const runTime = (endTime - startTime).toFixed(4);

    setStats({
      wordCount,
      charCount,
      charCountWithoutSpaces,
      paragraphCount,
      sentenceCount,
      spacesCount,
      runTime,
    });

    setKeyWordStats(wordFrequency);
  };

  const countWordFrequency = (text) => {
    const words = text.toLowerCase().match(/[\p{L}\p{N}_-]+/gu);

    const wordCounts = {};

    if (words) {
      words.forEach((word) => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });
    }

    const totalWords = words ? words.length : 0;

    return Object.entries(wordCounts)
      .map(([word, count]) => [
        word,
        count,
        ((count / totalWords) * 100).toFixed(2),
      ])
      .sort((a, b) => b[1] - a[1]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        direction: language === "ar" ? "rtl" : "ltr",
        textAlign: language === "ar" ? "right" : "left",
      }}
    >
      <Typography
        variant="h3"
        component="div"
        sx={{
          flexGrow: 1,
          fontWeight: "bold",
          mt: 6,
          mb: 4,
          textAlign: "center",
          color: "#031B29",
        }}
      >
        {labels[language].title}
      </Typography>
      <Textarea
        color="primary"
        disabled={false}
        minRows={3}
        // placeholder="Type or Paste Your text ..."
        placeholder={
          language === "ar" ? "ادخل نصك هنا ..." : "Type or Paste Your text ..."
        }
        value={text}
        size="lg"
        variant="soft"
        sx={{ mb: "25px" }}
        onChange={(e) => {
          setText(e.target.value);
          analyzeText(e.target.value);
        }}
      />
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
          gap: 3,
          textAlign: "center",
        }}
      >
        <Card sx={{ border: "2px solid #A1BBCB", borderRadius: "10px" }}>
          <CardActionArea
            sx={{
              height: "100%",
              "&[data-active]": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selectedHover",
                },
              },
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h6" component="div">
                {labels[language].words}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {/* word count */}
                {stats.wordCount}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          sx={{
            border: "2px solid #A1BBCB",
            borderRadius: "10px",
          }}
        >
          <CardActionArea
            sx={{
              height: "100%",
              "&[data-active]": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selectedHover",
                },
              },
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h6" component="div">
                {labels[language].characters}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {/* charCount */}
                {stats.charCount}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          sx={{
            border: "2px sold #A1BBCB",
            borderRadius: "10px",
          }}
        >
          <CardActionArea
            sx={{
              height: "100%",
              "&[data-active]": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selectedHover",
                },
              },
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h6" component="div">
                {labels[language].charactersWithoutSpaces}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {/* charCountWithoutSpaces */}
                {stats.charCountWithoutSpaces}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          sx={{
            border: "2px sold #A1BBCB",
            borderRadius: "10px",
          }}
        >
          <CardActionArea
            sx={{
              height: "100%",
              "&[data-active]": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selectedHover",
                },
              },
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h6" component="div">
                {labels[language].paragraphs}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {/* ParagraphsCount */}
                {stats.paragraphCount}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          sx={{
            border: "2px sold #A1BBCB",
            borderRadius: "10px",
          }}
        >
          <CardActionArea
            sx={{
              height: "100%",
              "&[data-active]": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selectedHover",
                },
              },
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h6" component="div">
                {labels[language].sentences}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {/* SentencesCount */}
                {stats.sentenceCount}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          sx={{
            border: "2px sold #A1BBCB",
            borderRadius: "10px",
          }}
        >
          <CardActionArea
            sx={{
              height: "100%",
              "&[data-active]": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selectedHover",
                },
              },
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h6" component="div">
                {labels[language].spaces}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {/* SpacesCount */}
                {stats.spacesCount}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "relative",
          width: { xs: "150px", sm: "200px", md: "250px", lg: "300px" },
          height: { xs: "150px", sm: "200px", md: "250px", lg: "300px" },
          margin: "20px auto",
        }}
      >
        <CircularProgress
          variant="determinate"
          value={100}
          sx={{
            width: "100% !important",
            height: "100% !important",
            color: "#136391",
          }}
        />
        <Typography
          // position="absolute"
          sx={{
            position: "absolute",
            top: "42%", // Pins the text slightly above the exact center
            left: "50%",
            transform: "translate(-50%, -50%)", // Centers the text based on its own width/height
            fontSize: { xs: "16px", sm: "18px", md: "22px", lg: "25px" },
            fontWeight: "bold",
          }}
        >
          {/* run time */}
          {stats.runTime}
        </Typography>
        <Typography
          // position="absolute"
          sx={{
            position: "absolute",
            top: "58%", // Pins the text slightly below the exact center
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: { xs: "18px", sm: "22px", md: "26px", lg: "30px" },
            fontWeight: "bold",
          }}
        >
          ms
        </Typography>
      </Box>

      <Card
        sx={{
          border: "2px sold #A1BBCB",
          borderRadius: "10px",
          gridColumn: "1 / -1",
          mb: "30px",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ mb: 2, textAlign: "center", color: "#136391" }}
          >
            {language === "ar" ? "اكثر الكلمات تكرارا" : " Most used Keyword"}
          </Typography>
          <TableContainer
            component={"Paper"}
            sx={{
              maxHeight: "400px",
              overflow: "auto",
              direction: language === "ar" ? "rtl" : "ltr",
            }}
          >
            <Table stickyHeader size="medium" aria-label="word frequency table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#F5F5F5",
                      color: "#136391",
                    }}
                    align="center"
                  >
                    {language === "ar" ? "الكلمة" : "Word"}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#F5F5F5",
                      color: "#136391",
                    }}
                    align="center"
                  >
                    {language === "ar" ? "التكرار" : "Count"}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#F5F5F5",
                      color: "#136391",
                    }}
                    align="center"
                  >
                    {language === "ar" ? "النسبة المئوية" : "Percentage"}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {keywordStats
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(([word, count, percentage], index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{word}</TableCell>
                      <TableCell align="center">{count}</TableCell>
                      <TableCell align="center">{percentage}%</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>

        <TablePagination
          component="div"
          count={keywordStats.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage={
            language === "ar" ? "عدد الصفوف:" : "Rows Per Page:"
          }
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} ${language === "ar" ? "من" : "of"} ${count !== -1 ? count : `more than ${to}`}`
          }
          sx={{
            "& .MuiTablePagination-toolbar": {
              color: "#136391",
            },
            "& .MuiTablePagination-selectLabel": {
              color: "#136391",
            },
            "& .MuiTablePagination-displayedRows": {
              color: "#136391",
            },
            "& .MuiTablePagination-actions button": {
              color: "#136391",
            },
            "& .MuiInputBase-root": {
              color: "#136391",
            },
            "& .MuiSvgIcon-root": {
              color: "#136391",
            },
          }}
        />
      </Card>
    </Container>
  );
};

export default CountApp;
