import { hyphenateSync } from "hyphen/en";

export default function (context) {
    return {
        plugin: function (markdownIt, _options) {
            const defaultTextRenderer = markdownIt.renderer.rules.text;

            markdownIt.renderer.rules.text = markdownIt.renderer.rules.pdf = (
                tokens,
                idx,
                options,
                env,
                self
            ) => {
                tokens[idx].content = hyphenateSync(tokens[idx].content);
                return defaultTextRenderer(tokens, idx, options, env, self);
            };

            markdownIt.block.ruler.before(
                "paragraph",
                "pdf_block",
                (state, startLine, endLine, silent) => {
                    const start =
                        state.bMarks[startLine] + state.tShift[startLine];

                    // Check if the line starts with "\pdf"
                    if (state.src.slice(start, start + 4) !== "\\pdf") {
                        return false;
                    }

                    // Check if silent mode is enabled
                    if (silent) {
                        return true;
                    }

                    // Find the end of the "\pdf" block
                    let endPdfLine;
                    for (
                        endPdfLine = startLine + 1;
                        endPdfLine < endLine;
                        endPdfLine++
                    ) {
                        const lineStart =
                            state.bMarks[endPdfLine] + state.tShift[endPdfLine];

                        // Check if the line starts with "\endPdf"
                        if (
                            state.src.slice(lineStart, lineStart + 7) ==
                            "\\endpdf"
                        ) {
                            break;
                        }
                    }

                    // Create a new "pdf" token
                    const token = state.push("pdf", "div", 0);
                    token.block = true;
                    token.content = state.getLines(
                        startLine + 1,
                        endPdfLine,
                        state.tShift[startLine],
                        true
                    );
                    token.map = [startLine, endPdfLine];
                    token.markup = "\\pdf";

                    state.line = endPdfLine + 1;

                    return true;
                }
            );

            markdownIt.block.ruler.before(
                "paragraph",
                "pdf_breaks",
                (state, startLine, endLine, silent) => {
                    var lineText = state.src.slice(
                        state.bMarks[startLine],
                        state.eMarks[startLine]
                    );

                    switch (lineText.trim()) {
                        case "\\column":
                            if (!silent) {
                                const token = state.push(
                                    "columnBreak",
                                    "div",
                                    0
                                );
                                token.block = true;
                                token.content =
                                    '<div class="paginator-columnBreak"></div>';
                                token.map = [startLine, startLine + 1];
                                token.markup = "\\column";

                                state.line = startLine + 1;

                                return true;
                            }
                            return true;
                        case "\\page":
                            if (!silent) {
                                const token = state.push("pageBreak", "div", 0);
                                token.block = true;
                                token.content =
                                    '</div></div><div class="paginator-container"><div class="paginator">';
                                token.map = [startLine, startLine + 1];
                                token.markup = "\\page";

                                state.line = startLine + 1;
                            }
                            return true;
                        default:
                            return false;
                    }
                }
            );

            markdownIt.renderer.rules.columnBreak = (
                tokens,
                idx,
                options,
                env,
                self
            ) => {
                const token = tokens[idx];
                return token.content;
            };

            markdownIt.renderer.rules.pageBreak = (
                tokens,
                idx,
                options,
                env,
                self
            ) => {
                const token = tokens[idx];
                return token.content;
            };

            markdownIt.renderer.rules.pdf = (
                tokens,
                idx,
                options,
                env,
                self
            ) => {
                const token = tokens[idx];

                // Render the content of the "pdf" token using the "render" method
                const content = token.content
                    ? markdownIt.render(token.content, options, env)
                    : "";

                // Wrap the rendered content in a <div> with a class
                return `<div class="paginator-container"><div class="paginator">${content}</div></div>`;
            };
        },
        assets: function () {
            return [{ name: "paginator.js" }, { name: "paginator.css" }];
        },
    };
}
