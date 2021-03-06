import {alignUSFM} from "../Injector";

describe("align usfm3", () => {
    it("has no usfm or alignment data", () => {
        const usfm = "";
        const alignments = {
            segments: []
        };
        expect(alignUSFM(alignments, usfm)).toEqual(usfm);
    });

    it("has no alignment data", () => {
        const usfm = `\\id REV unfoldingWord Literal Text
\\ide UTF-8
\\h Revelation
\\toc1 The Book of Revelation
\\toc2 Revelation
\\toc3 Rev
\\mt Revelation

\\s5
\\c 1
\\p
\\v 1
\\zaln-s | x-content="Βίβλος"
\\w book\\w*
\\zaln-e\\*
\\zaln-s | x-content="γενέσεως"
\\w genealogy\\w*
\\zaln-e\\*
\\zaln-s | x-content="Ἰησοῦ"
\\w Jesus\\w*
\\zaln-e\\*
\\zaln-s | x-content="Χριστοῦ"
\\w Christ\\w*
\\zaln-e\\*
\\zaln-s | x-content="υἱοῦ"
\\w son\\w*
\\w of\\w*
\\zaln-e\\*
`;
        const alignments = {
            segments: []
        };
        expect(alignUSFM(alignments, usfm)).toEqual(usfm);
    });

    it("aligns the entire verse", () => {
        const usfm = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\w Speak|x-occurrence="1" x-occurrences="1"\\w*
\\w of|x-occurrence="1" x-occurrences="1"\\w*
`;
        const alignments = {
            metadata: {
                resources: {
                    r1: {
                        languageCode: "en"
                    }
                }
            },
            segments: [
                {
                    resources: {
                        r1: {
                            tokens: tokenize("Speak of"),
                            metadata: {
                                contextId: "MAT001001"
                            }
                        },
                        r0: {
                            tokens: tokenize("kaepS fo"),
                            metadata: {
                                contextId: "MAT001001"
                            }
                        },
                    },
                    alignments: [
                        {
                            r0: [0],
                            r1: [0]
                        },
                        {
                            r0: [1],
                            r1: [1]
                        }
                    ]
                }
            ]
        };
        const expected = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="kaepS"
\\w Speak|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="fo"
\\w of|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
`;
        expect(alignUSFM(alignments, usfm)).toEqual(expected);
    });

    it("aligns part of the verse", () => {
        const usfm = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\w Speak|x-occurrence="1" x-occurrences="1"\\w*
\\w of|x-occurrence="1" x-occurrences="1"\\w*`;
        const alignments = {
            metadata: {
                resources: {
                    r1: {
                        languageCode: "en"
                    }
                }
            },
            segments: [
                {
                    resources: {
                        r1: {
                            tokens: tokenize("Speak of"),
                            metadata: {
                                contextId: "MAT001001"
                            }
                        },
                        r0: {
                            tokens: tokenize("kaepS"),
                            metadata: {
                                contextId: "MAT001001"
                            }
                        }
                    },
                    alignments: [
                        {
                            r0: [0],
                            r1: [0]
                        }
                    ]
                }
            ]
        };
        const expected = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="kaepS"
\\w Speak|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\w of|x-occurrence="1" x-occurrences="1"\\w*`;
        expect(alignUSFM(alignments, usfm)).toEqual(expected);
    });

    it("overwrites the usfm text", () => {
        const usfm = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
`;
        const alignments = {
            metadata: {
                resources: {
                    r1: {
                        languageCode: "en"
                    }
                }
            },
            segments: [
                {
                    resources: {
                        r1: {
                            tokens: tokenize("Speak of"),
                            metadata: {
                                contextId: "MAT001001"
                            }
                        },
                        r0: {
                            tokens: tokenize("kaepS"),
                            metadata: {
                                contextId: "MAT001001"
                            }
                        }
                    },
                    alignments: [
                        {
                            r0: [0],
                            r1: [0]
                        }
                    ]
                }
            ]
        };
        const expected = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="kaepS"
\\w Speak|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\w of|x-occurrence="1" x-occurrences="1"\\w*`;
        expect(alignUSFM(alignments, usfm)).toEqual(expected);
    });

    it("aligns several verses", () => {
        const usfm = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\w Speak|x-occurrence="1" x-occurrences="1"\\w*
\\v 2
\\w of|x-occurrence="1" x-occurrences="1"\\w*
`;
        const alignments = {
            metadata: {
                resources: {
                    r1: {
                        languageCode: "en"
                    }
                }
            },
            segments: [
                {
                    resources: {
                        r1: {
                            tokens: tokenize("Speak"),
                            metadata: {
                                contextId: "MAT001001"
                            }
                        },
                        r0: {
                            tokens: tokenize("kaepS"),
                            metadata: {
                                contextId: "MAT001001"
                            }
                        }
                    },
                    alignments: [
                        {
                            r0: [0],
                            r1: [0]
                        }
                    ]
                },
                {
                    resources: {
                        r1: {
                            tokens: tokenize("of"),
                            metadata: {
                                contextId: "MAT001002"
                            }
                        },
                        r0: {
                            tokens: tokenize("fo"),
                            metadata: {
                                contextId: "MAT001002"
                            }
                        }
                    },
                    alignments: [
                        {
                            r0: [0],
                            r1: [0]
                        }
                    ]
                }
            ]
        };
        const expected = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="kaepS"
\\w Speak|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\v 2
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="fo"
\\w of|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
`;
        expect(alignUSFM(alignments, usfm)).toEqual(expected);
    });

    it("skips un-verified alignments", () => {
        const usfm = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\w Speak|x-occurrence="1" x-occurrences="1"\\w*
\\v 2
\\w of|x-occurrence="1" x-occurrences="1"\\w*
`;
        const alignments = {
            metadata: {
                resources: {
                    r1: {
                        languageCode: "en"
                    }
                }
            },
            segments: [
                {
                    resources: {
                        r1: {
                            tokens: tokenize("Speak"),
                            metadata: {
                                contextId: "MAT001001"
                            }
                        },
                        r0: {
                            tokens: tokenize("kaepS"),
                            metadata: {
                                contextId: "MAT001001"
                            }
                        }
                    },
                    alignments: [
                        {
                            r0: [0],
                            r1: [0],
                            verified: false
                        }
                    ]
                },
                {
                    resources: {
                        r1: {
                            tokens: tokenize("of"),
                            metadata: {
                                contextId: "MAT001002"
                            }
                        },
                        r0: {
                            tokens: tokenize("fo"),
                            metadata: {
                                contextId: "MAT001002"
                            }
                        }
                    },
                    alignments: [
                        {
                            r0: [0],
                            r1: [0],
                            verified: true
                        }
                    ]
                }
            ]
        };
        const expected = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\w Speak|x-occurrence="1" x-occurrences="1"\\w* 
\\v 2
\\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="1" x-content="fo"
\\w of|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
`;
        expect(alignUSFM(alignments, usfm, false)).toEqual(expected);
    });

    it("aligns multiple source tokens", () => {
        const usfm = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\w hello|x-occurrence="1" x-occurrences="1"\\w*
`;
        const alignments = {
            metadata: {
                resources: {
                    r1: {
                        languageCode: "en"
                    }
                }
            },
            segments: [
                {
                    resources: {
                        r1: {
                            tokens: tokenize("hello"),
                            metadata: {
                                contextId: "MAT001001"
                            }
                        },
                        r0: {
                            tokens: tokenize("olleh dlrow"),
                            metadata: {
                                contextId: "MAT001001"
                            }
                        }
                    },
                    alignments: [
                        {
                            r0: [0, 1],
                            r1: [0]
                        }
                    ]
                }
            ]
        };
        const expected = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="olleh"
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="dlrow"
\\w hello|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\zaln-e\\*
`;
        expect(alignUSFM(alignments, usfm)).toEqual(expected);
    });

    it("aligns multiple target tokens", () => {
        const usfm = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\w hello|x-occurrence="1" x-occurrences="1"\\w*
\\w world|x-occurrence="1" x-occurrences="1"\\w*
`;
        const alignments = {
            metadata: {
                resources: {
                    r1: {
                        languageCode: "en"
                    }
                }
            },
            segments: [
                {
                    resources: {
                        r1: {
                            tokens: tokenize("hello world"),
                            metadata: {
                                contextId: "MAT001001"
                            }
                        },
                        r0: {
                            tokens: tokenize("olleh"),
                            metadata: {
                                contextId: "MAT001001"
                            }
                        }
                    },
                    alignments: [
                        {
                            r0: [0],
                            r1: [0, 1]
                        }
                    ]
                }
            ]
        };
        const expected = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="olleh"
\\w hello|x-occurrence="1" x-occurrences="1"\\w*
\\w world|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
`;
        expect(alignUSFM(alignments, usfm)).toEqual(expected);
    });
});

/**
 * Tokenizes a string.
 * TRICKY: this will not properly handle occurrences.
 * @param str
 * @return {any[]}
 */
const tokenize = (str: string) => {
    const tokens = [];
    const words = str.trim().split(" ");
    for (const w of words) {
        tokens.push({
            text: w,
            occurrence: 1,
            occurrences: 1
        });
    }
    return tokens;
};
