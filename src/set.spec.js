import set from "./set";
import _set from "lodash/set";

describe("set", () => {
    it("replaces existing value, behaves like lodash", () => {
        {
            const obj = {
                title: "Hello",
            };
            _set(obj, "title", "World");
            obj.title.must.equal("World");
        }

        {
            const obj = {
                title: "Hello",
            };
            set(obj, "title", "World");
            obj.title.must.equal("World");
        }
    });

    it("adds new value, behaves like lodash", () => {
        {
            const obj = {
                title: "Hello",
            };
            _set(obj, "name", "World");
            obj.title.must.equal("Hello");
            obj.name.must.equal("World");
        }

        {
            const obj = {
                title: "Hello",
            };
            set(obj, "name", "World");
            obj.title.must.equal("Hello");
            obj.name.must.equal("World");
        }
    });

    it("allows deep set, behaves like lodash", () => {
        {
            const obj = {
                data: {
                    title: "Bye",
                },
            };
            _set(obj, "data.title", "Hi");
            obj.data.title.must.equal("Hi");
        }

        {
            const obj = {
                data: {
                    title: "Bye",
                },
            };
            set(obj, "data.title", "Hi");
            obj.data.title.must.equal("Hi");
        }
    });

    it("adds objects if not existing on the way, behaves like lodash", () => {
        {
            const obj = {
                data: null,
            };
            _set(obj, "data.title", "Hi");
            obj.data.must.be.an.object();
            obj.data.title.must.equal("Hi");
        }

        {
            const obj = {};
            _set(obj, "data.title.short", "Hi");
            obj.data.must.be.an.object();
            obj.data.title.must.be.an.object();
            obj.data.title.short.must.equal("Hi");
        }

        {
            const obj = {
                data: null,
            };
            set(obj, "data.title", "Hi");
            obj.data.must.be.an.object();
            obj.data.title.must.equal("Hi");
        }

        {
            const obj = {};
            set(obj, "data.title.short", "Hi");
            obj.data.must.be.an.object();
            obj.data.title.must.be.an.object();
            obj.data.title.short.must.equal("Hi");
        }
    });

    it("replaces primitives with objects on the way, behaves like lodash", () => {
        {
            const obj = {
                data: true,
            };
            _set(obj, "data.title.short", "Hi");
            obj.data.must.be.an.object();
            obj.data.title.must.be.an.object();
            obj.data.title.short.must.equal("Hi");
        }

        {
            const obj = {
                data: "empty",
            };
            _set(obj, "data.title.short", "Hi");
            obj.data.must.be.an.object();
            obj.data.title.must.be.an.object();
            obj.data.title.short.must.equal("Hi");
        }

        {
            const obj = {
                data: true,
            };
            set(obj, "data.title.short", "Hi");
            obj.data.must.be.an.object();
            obj.data.title.must.be.an.object();
            obj.data.title.short.must.equal("Hi");
        }

        {
            const obj = {
                data: "empty",
            };
            set(obj, "data.title.short", "Hi");
            obj.data.must.be.an.object();
            obj.data.title.must.be.an.object();
            obj.data.title.short.must.equal("Hi");
        }
    });

    it("doesn't crash on nulls as source, but returns new object, behaves NOT like lodash", () => {
        {
            const obj = null;
            (() => {
                _set(obj, "data.title.short", "Hi");
            }).must.not.throw();

            const newObj = _set(obj, "data.title.short", "Hi");
            (newObj === null).must.be.true();
        }

        {
            const obj = null;
            (() => {
                set(obj, "data.title.short", "Hi");
            }).must.not.throw();

            const newObj = set(obj, "data.title.short", "Hi");
            newObj.must.be.an.object();
            newObj.data.title.short.must.equal("Hi");
        }
    });

    it("doesn't crash on primitives as source", () => {
        {
            const obj = "hello";
            (() => {
                _set(obj, "data.title.short", "Hi");
            }).must.not.throw();

            const newObj = _set(obj, "data.title.short", "Hi");
            newObj.must.equal("hello");
        }

        {
            const obj = 88;
            (() => {
                _set(obj, "data.title.short", "Hi");
            }).must.not.throw();

            const newObj = _set(obj, "data.title.short", "Hi");
            newObj.must.equal(88);
        }

        {
            const obj = "hello";
            (() => {
                set(obj, "data.title.short", "Hi");
            }).must.not.throw();

            const newObj = set(obj, "data.title.short", "Hi");
            newObj.must.be.an.object();
            newObj.data.title.short.must.equal("Hi");
        }

        {
            const obj = 88;
            (() => {
                set(obj, "data.title.short", "Hi");
            }).must.not.throw();

            const newObj = set(obj, "data.title.short", "Hi");
            newObj.must.be.an.object();
            newObj.data.title.short.must.equal("Hi");
        }
    });

    it("works on functions as source, behaves like lodash", () => {
        {
            const obj = () => {};
            (() => {
                _set(obj, "lo.da", "sh");
            }).must.not.throw();

            obj.lo.da.must.equal("sh");
        }

        {
            const obj = () => {};
            (() => {
                set(obj, "lo.da", "sh");
            }).must.not.throw();

            obj.lo.da.must.equal("sh");
        }
    });

    it("creates an object when numeric index is used and target isn't set, behaves NOT like lodash", () => {
        {
            const obj = {};
            _set(obj, ["items", 5, "title"], "Jan Padeusz");
            obj.items.must.be.an.array();
            obj.items.must.eql([,,,,, // eslint-disable-line no-sparse-arrays
                {
                    title: "Jan Padeusz",
                }]);
        }

        {
            const obj = {};
            _set(obj, "items.5.title", "Jan Padeusz");
            obj.items.must.be.an.array();
            obj.items.must.eql([,,,,, // eslint-disable-line no-sparse-arrays
                {
                    title: "Jan Padeusz",
                }]);
        }

        {
            const obj = {};
            set(obj, ["items", 5, "title"], "Jan Padeusz");
            obj.items.must.not.be.an.array();
            obj.items.must.eql({
                5: {
                    title: "Jan Padeusz",
                },
            });
        }

        {
            const obj = {};
            set(obj, "items.5.title", "Jan Padeusz");
            obj.items.must.not.be.an.array();
            obj.items.must.eql({
                5: {
                    title: "Jan Padeusz",
                },
            });
        }
    });

    it("doesn't parse path string as js code, behaves NOT like lodash", () => {
        {
            const obj = {};
            _set(obj, "hello[world]", "is it me you're looking for?");
            obj.hello.world.must.equal("is it me you're looking for?");
        }

        {
            const obj = {};
            set(obj, "hello[world]", "is it me you're looking for?");
            obj.must.not.have.property("hello");
            obj.must.have.property("hello[world]");
            obj["hello[world]"].must.equal("is it me you're looking for?");
        }
    });

    it("allow dot separated path, behaves like lodash", () => {
        {
            const obj = {};
            _set(obj, "hello.world", "is it me you're looking for?");
            obj.hello.world.must.equal("is it me you're looking for?");
        }

        {
            const obj = {};
            set(obj, "hello.world", "is it me you're looking for?");
            obj.hello.world.must.equal("is it me you're looking for?");
        }
    });

    it("allow arrays as path, behaves like lodash", () => {
        {
            const obj = {};
            _set(obj, ["hello", "world"], "is it me you're looking for?");
            obj.hello.world.must.equal("is it me you're looking for?");
        }

        {
            const obj = {};
            set(obj, ["hello", "world"], "is it me you're looking for?");
            obj.hello.world.must.equal("is it me you're looking for?");
        }
    });

    it("doesn't parse mixed array/dot-strings paths, behaves like lodash", () => {
        {
            const obj = {};
            _set(obj, ["hello", "world.5"], "is it me you're looking for?");
            obj.hello.must.not.have.property("world");
            obj.hello.must.have.property("world.5");
            obj.hello["world.5"].must.equal("is it me you're looking for?");
        }

        {
            const obj = {};
            set(obj, ["hello", "world.5"], "is it me you're looking for?");
            obj.hello.must.not.have.property("world");
            obj.hello.must.have.property("world.5");
            obj.hello["world.5"].must.equal("is it me you're looking for?");
        }
    });

    // @todo test Maps, Sets, etc.
});
