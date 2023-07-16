.PHONY: all clean

WASM_NAME := evaluator
WASM_FILE := $(WASM_NAME).wasm
GO_SOURCES := $(wildcard *.go)
OUT_DIR := ../../public/wasm
OUT_PATH := $(OUT_DIR)/$(WASM_FILE)

all: $(WASM_FILE)

$(WASM_FILE): $(GO_SOURCES)
	GOOS=js GOARCH=wasm go build -ldflags="-s -w" -o $(OUT_PATH) && \
	cp $(shell go env GOROOT)/misc/wasm/wasm_exec.js $(OUT_DIR)/

clean:
	rm -fr $(OUT_DIR)
