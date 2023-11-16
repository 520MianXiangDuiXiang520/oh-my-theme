package main

import "fmt"

type Color struct {
	C     int16
	Reset bool
}

func (c Color) String() string {
	if c.C < 0 {
		return ""
	}
	return fmt.Sprintf("$FG[%d]", c.C)
}
