package reflection

import (
	"reflect"
	"testing"
)

type Person struct {
	Name    string
	Profile Profile
}

type Profile struct {
	Age  int
	City string
}

func TestWalk(t *testing.T) {
	cases := []struct {
		Name          string
		Input         interface{}
		ExpectedCalls []string
	}{
		{
			"struct with on string field",
			struct {
				Name string
			}{"Paul"},
			[]string{"Paul"},
		},
		{
			"struct with two string fields",
			struct {
				Name string
				City string
			}{
				"Paul",
				"Boston",
			},
			[]string{"Paul", "Boston"},
		},
		{
			"struct with no string fields",
			struct {
				Name string
				Age  int
			}{"Paul", 31},
			[]string{"Paul"},
		},
		{
			"nested fields",
			Person{
				"Paul",
				Profile{
					31, "Boston",
				},
			},
			[]string{"Paul", "Boston"},
		},
		{
			"pointer to things",
			&Person{
				"Paul",
				Profile{31, "Boca"},
			},
			[]string{"Paul", "Boca"},
		},
		{
			"slices",
			[]Profile{
				{31, "Boston"},
				{26, "Lima"},
			},
			[]string{"Boston", "Lima"},
		},
		{
			"arrays",
			[2]Profile{
				{72, "Mary"},
				{54, "Lis"},
			},
			[]string{"Mary", "Lis"},
		},
	}

	for _, test := range cases {
		t.Run(test.Name, func(t *testing.T) {
			var got []string
			Walk(test.Input, func(s string) {
				got = append(got, s)
			})
			if !reflect.DeepEqual(got, test.ExpectedCalls) {
				t.Errorf("got %v want %v", got, test.ExpectedCalls)
			}
		})
	}

	t.Run("with maps", func(t *testing.T) {
		aMap := map[string]string{
			"Cow":   "Moo",
			"Sheep": "Baa",
		}

		var got []string
		Walk(aMap, func(s string) {
			got = append(got, s)
		})

		assertContains(t, got, "Moo")
		assertContains(t, got, "Baa")
	})

	t.Run("with channels", func(t *testing.T) {
		aChannel := make(chan Profile)

		go func() {
			aChannel <- Profile{31, "Paul"}
			aChannel <- Profile{26, "Brenda"}
			close(aChannel)
		}()

		var got []string
		want := []string{"Paul", "Brenda"}

		Walk(aChannel, func(input string) {
			got = append(got, input)
		})

		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %v but wanted %v", got, want)
		}
	})

	t.Run("with function", func(t *testing.T) {
		aFunction := func() (Profile, Profile) {
			return Profile{31, "Boston"}, Profile{26, "Lima"}
		}

		var got []string
		want := []string{"Boston", "Lima"}

		Walk(aFunction, func(input string) {
			got = append(got, input)
		})

		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %v, want %v", got, want)
		}
	})
}

func assertContains(t *testing.T, haystack []string, needle string) {
	t.Helper()
	contains := false
	for _, s := range haystack {
		if s == needle {
			contains = true
		}
	}
	if !contains {
		t.Errorf("expected %v to contain %q but it didn't", haystack, needle)
	}
}
